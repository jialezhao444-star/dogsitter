import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/auth.entity';
import { RegisterDto } from './dto/register.dto';
import { compare, genSalt, hash } from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {

    constructor(
        @InjectModel(User)
        private readonly authUserModel: typeof User,
        private jwtService: JwtService,
    ) {}

    async register(registerDto: RegisterDto) {
        const authuser = await this.authUserModel.findOne({
            where: { email: registerDto.email },
        })
        if (authuser) {
            throw new BadRequestException(
                'This email already exists. Please try again.',
            );
        }

        //encrypt password (hash)
        const salt = await genSalt(10);
        const hashPassword = await hash(registerDto.password, salt);

        // insert new user into table
        const newUser = await this.authUserModel.create({
            name: registerDto.name,
            lastname: registerDto.lastname,
            address: registerDto.address,
            phone: registerDto.phone,
            email: registerDto.email,
            password: hashPassword,
            role: registerDto.role,
        });
        return newUser;
    }

    async login(loginDto: LoginDto) {
        const authuser = await this.authUserModel.findOne({
            where: { email: loginDto.email },
            attributes: ['id', 'email', 'password', 'role'],
        });
          
        if (!authuser) {
            throw new UnauthorizedException('This email does not exist.');
        }

        console.log('LOGIN DTO:', loginDto);
        console.log('USER FROM DB:', authuser?.toJSON());

        if (!loginDto.password || !authuser.password) {
            throw new BadRequestException('Missing password data');
          }
          
        const isValid = await compare(loginDto.password, authuser.password);
          
        if (!isValid) {
          throw new UnauthorizedException('Wrong password');
        }
    
        const payload = { user_id: authuser.id };
    
        const token = await this.jwtService.signAsync(payload, {
            secret: process.env.JWT_SECRET_KEY,
        });
    
        return {
            access_token: token,
            user: {
                id: authuser.id,
                name: authuser.name,
                email: authuser.email,
                role: authuser.role,
            },
        };
    }

    async getUserProfile(id: number) {
        return await this.authUserModel.findByPk(id, {
            attributes: ['id', 'username', 'email', 'role'],
        });
    }

    async findAll() {
        return await this.authUserModel.findAll();
      }
    
      async findOne(id: number) {
        return await this.authUserModel.findByPk(id);
      }
    
      async update(id: number, updateUserDto: UpdateUserDto) {
        return await this.authUserModel.update(updateUserDto, {
          where: { id: id },
        });
      }
    
      async remove(id: number) {
        return await this.authUserModel.destroy({
          where: { id: id },
        });
      }
}
