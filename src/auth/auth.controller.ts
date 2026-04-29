import { Body, Controller, HttpCode, Post, UseGuards, Request, Get, Patch, Param, NotFoundException, Delete } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/regist')
    @HttpCode(201) //show code 201 when register complete
    async register (@Body() registerDto: RegisterDto) {
        await this.authService.register(registerDto);
        return {
            message: 'Register Complete',
        }
    }

    @Post('/login')
    @HttpCode(200)
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

    @UseGuards(JwtAuthGuard) //protect route and check token
    @Get('/profile')
    async getProfile(@Request() req: any) {
        return await this.authService.getUserProfile(Number(req.user.user_id))
    }

    @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findDogsitter = await this.authService.findOne(+id);
    if (findDogsitter == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findDogsitter;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateDogsitterDto: UpdateUserDto) {
      const [updateDogsitter] = await this.authService.update(
        +id,
        updateDogsitterDto,
      );
    console.log(updateDogsitter);
    if (updateDogsitter === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyDogsitter = await this.authService.remove(+id);
    console.log(destroyDogsitter);
    if (destroyDogsitter == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
