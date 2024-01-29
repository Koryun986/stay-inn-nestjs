import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { RentHouseService } from "../service/rent-house.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { UserInterceptor } from "src/interceptors/auth/user.interceptor";
import { ZodValidationPipe } from "src/pipes/zod-validation.pipe";
import {
  CreateRentHouseDto,
  createRentHouseSchema,
} from "../dto/create-rent-house.dto";

@Controller("rent-house")
export class RentHouseController {
  constructor(private readonly rentHouseService: RentHouseService) {}

  @Post("create")
  @UseInterceptors(FilesInterceptor("files"))
  @UseInterceptors(UserInterceptor)
  async createRentHouse(
    @UploadedFiles()
    files: Array<Express.Multer.File>,
    @Body(new ZodValidationPipe(createRentHouseSchema))
    createRentHouseDto: CreateRentHouseDto,
  ) {}
}