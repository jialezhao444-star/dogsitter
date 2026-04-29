import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';

import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  // CREATE DOG WITH IMAGE
  @Post('/create')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname);
          const baseName = path
            .basename(file.originalname, fileExt)
            .replace(/[^a-zA-Z0-9]/g, '_');

          const uniqueName = Date.now() + '-' + baseName + fileExt;
          cb(null, uniqueName);
        },
      }),

      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },

      fileFilter: (req, file, cb) => {
        const allowedExt = /jpg|jpeg|png|webp/;
        const extValid = allowedExt.test(
          path.extname(file.originalname).toLowerCase(),
        );
        const mimeValid = allowedExt.test(file.mimetype);

        if (extValid && mimeValid) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Only jpg, jpeg, png, webp images are allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createDogDto: CreateDogDto,
  ) {
    if (!file) {
      throw new BadRequestException('Dog image is required');
    }

    createDogDto.image = `http://localhost:3000/uploads/${file.filename}`;

    const createDog = await this.dogService.create(createDogDto);

    if (createDog == null) {
      throw new Error('Can not Create Data!!!');
    }

    return {
      message: 'Create Data Complete',
      data: createDog,
    };
  }

  // GET ALL
  @Get()
  findAll() {
    return this.dogService.findAll();
  }

  // GET ONE
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findDog = await this.dogService.findOne(+id);

    if (findDog == null) {
      throw new NotFoundException('Not Found Data!!!');
    }

    return findDog;
  }

  // UPDATE DOG + OPTIONAL NEW IMAGE
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const fileExt = path.extname(file.originalname);
          const baseName = path
            .basename(file.originalname, fileExt)
            .replace(/[^a-zA-Z0-9]/g, '_');

          const uniqueName = Date.now() + '-' + baseName + fileExt;
          cb(null, uniqueName);
        },
      }),

      limits: {
        fileSize: 5 * 1024 * 1024,
      },

      fileFilter: (req, file, cb) => {
        const allowedExt = /jpg|jpeg|png|webp/;
        const extValid = allowedExt.test(
          path.extname(file.originalname).toLowerCase(),
        );
        const mimeValid = allowedExt.test(file.mimetype);

        if (extValid && mimeValid) {
          cb(null, true);
        } else {
          cb(
            new BadRequestException(
              'Only jpg, jpeg, png, webp images are allowed',
            ),
            false,
          );
        }
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    const oldDog = await this.dogService.findOne(+id);

    if (!oldDog) {
      throw new NotFoundException('Not Found Data to Update!!!');
    }

    if (file) {
      // delete old image file if exists
      if (oldDog.image) {
        const oldPath = './uploads/' + oldDog.image.split('/uploads/')[1];

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateDogDto.image = `http://localhost:3000/uploads/${file.filename}`;
    }

    const [updateDog] = await this.dogService.update(+id, updateDogDto);

    if (updateDog === 0) {
      throw new NotFoundException('Not Found Data to Update!!!');
    }

    return { message: 'Update Data Complete' };
  }

  // DELETE DOG + DELETE IMAGE FILE
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const oldDog = await this.dogService.findOne(+id);

    if (!oldDog) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }

    if (oldDog.image) {
      const oldPath = './uploads/' + oldDog.image.split('/uploads/')[1];

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    const destroyDog = await this.dogService.remove(+id);

    if (destroyDog == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }

    return { message: 'Remove Data Complete' };
  }
}