import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/create')
  async create(@Body() createUserDto: CreateUserDto) {
    const createUser = await this.userService.create(createUserDto);
    if (createUser == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createUser,
    };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findUser = await this.userService.findOne(+id);
    if (findUser == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findUser;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateUserDto: UpdateUserDto) {
      const [updateUser] = await this.userService.update(
        +id,
        updateUserDto,
      );
    console.log(updateUser);
    if (updateUser === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyUser = await this.userService.remove(+id);
    console.log(destroyUser);
    if (destroyUser == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
