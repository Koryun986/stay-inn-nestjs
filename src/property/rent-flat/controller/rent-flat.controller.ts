import {
  Controller,
  Post,
  Body,
  Req,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { RentFlatService } from "../services/rent-flat.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UserInterceptor } from "src/interceptors/auth/user.interceptor";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import {
  CreateRentFlatDto,
  createRentFlatSchema,
} from "../dto/create-rent-flat.dto";
import { UserDto } from "src/auth/dto/user.dto";
import { CreateRentFlatControllerReturn } from "../types/create-rent-flat-return.type";

@Controller("rent-flat")
export class RentFlatController {
  constructor(private readonly rentFlatService: RentFlatService) {}

  @Post("create")
  @UseInterceptors(FilesInterceptor("files"))
  @UseInterceptors(UserInterceptor)
  async createRentFlat(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body(new ZodValidationPipe(createRentFlatSchema))
    createRentFlatDto: CreateRentFlatDto,
    @Req()
    request: Request,
  ): Promise<CreateRentFlatControllerReturn> {
    const user: UserDto = (request as any).user_dto;
    const rentFlatWithImages = await this.rentFlatService.createRentFlat(
      files,
      createRentFlatDto,
      user.id,
    );
    return {
      ...rentFlatWithImages,
      user,
    };
  }
}
