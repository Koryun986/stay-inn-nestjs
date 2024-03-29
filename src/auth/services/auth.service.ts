import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { UserEntity } from "../../typeorm/entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/auth/dto/create-user.dto";
import { JwtTokenService } from "src/jwt-service/service/jwt.service";
import { JwtTokens } from "src/jwt-service/types/jwt-token.type";
import { LoginUserDto } from "../dto/login-user.dto";
import { TransactionService } from "src/database-transaction/transaction.service";
import { AvatarEntity } from "src/typeorm/entities/avatar.entity";
import { CloudStorageService } from "src/cloud-storage/services/cloud-storage.service";
import { UserDto } from "../dto/user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly jwtTokenServcie: JwtTokenService,
    @InjectRepository(AvatarEntity) private avatarRepository: Repository<AvatarEntity>,
    private readonly transactionService: TransactionService,
    private readonly cloudStorageService: CloudStorageService,
  ) {}

  async registrateUser(
    userDto: CreateUserDto,
    image?: Express.Multer.File,
  ): Promise<UserDto & JwtTokens & string> {
    await this.validateUserIfExist(userDto);

    const user = await this.createUser(userDto);
    return this.transactionService.transaction(async (queryRunner) => {
      const savedUser = await queryRunner.manager.save(user);
      const avatar = await this.createAvatar(savedUser.id, image);
      const { accessToken, refreshToken } =
        await this.jwtTokenServcie.generateTokens({
          ...user,
          avatar_url: avatar.avatar_url,
        });
      refreshToken.user_id = savedUser.id;
      await queryRunner.manager.save(refreshToken);
      await queryRunner.manager.save(avatar);
      await queryRunner.commitTransaction();
      return {
        id: savedUser.id,
        email: savedUser.email,
        name: savedUser.name,
        avatar_url: avatar.avatar_url,
        accessToken,
        refreshToken,
      };
    });
  }

  async loginUser(userDto: LoginUserDto): Promise<UserDto & JwtTokens> {
    const user = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (!user) {
      throw new UnauthorizedException("User not found");
    }
    await this.comparePasswordWithHashedPassword(
      userDto.password,
      user.password,
    );
    const avatarUrl = await this.getAvatarUrlById(user.id);
    const refreshToken = await this.jwtTokenServcie.validateRefreshToken({
      ...user,
      avatar_url: avatarUrl,
    });
    const accessToken = await this.jwtTokenServcie.gnenerateAccessToken({
      ...user,
      avatar_url: avatarUrl,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar_url: avatarUrl,
      accessToken,
      refreshToken,
    };
  }

  async updateTokens(accessToken: string, refreshToken: string) {
    const user = await this.jwtTokenServcie.isTokensBelongsToOneUser(
      accessToken,
      refreshToken,
    );
    if (await this.isUsersRefreshTokenExpires(user))
      throw new BadRequestException("Please login to your account");

    const newAccessToken =
      await this.jwtTokenServcie.gnenerateAccessToken(user);
    return newAccessToken;
  }

  async isUsersRefreshTokenExpires(userDto: UserDto) {
    const token = await this.jwtTokenServcie.getRefreshTokenFromUser(userDto);
    const isValid = await this.jwtTokenServcie.isValideRefreshToken(token);
    return !isValid;
  }

  async validateUserIfExist(userDto: CreateUserDto) {
    const userExist = await this.userRepository.findOneBy({
      email: userDto.email,
    });
    if (userExist) {
      throw new BadRequestException("User already exists");
    }
  }

  async createUser(userDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await this.hashPassword(userDto.password);
    const user = this.userRepository.create({
      name: userDto.name,
      email: userDto.email,
      password: hashedPassword,
    });

    return user;
  }

  async getAvatarUrlById(userId: number): Promise<string> {
    const avatar = await this.avatarRepository.findOneBy({ user_id: userId });
    return avatar.avatar_url;
  }

  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 3);
  }

  async comparePasswordWithHashedPassword(
    comparedPassword: string,
    hashedPassword: string,
  ) {
    const hashedComparedPassword = await this.hashPassword(comparedPassword);
    bcrypt.compare(hashedComparedPassword, hashedPassword, (err) => {
      if (err) throw new BadRequestException("Email or Password is incorrect");
    });
  }

  async createAvatar(userId: number, image?: Express.Multer.File) {
    const url = await this.cloudStorageService.uploadUserAvatar(userId, image);
    return this.avatarRepository.create({
      user_id: userId,
      avatar_url: url,
    });
  }
}
