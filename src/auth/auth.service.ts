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
        });
        return newUser;
    }

    async login(loginDto: LoginDto){
        //check email
        const authuser = await this.authUserModel.findOne({
            where: { email: loginDto.email },
            attributes: ['id', 'username', 'email', 'password'],
        });
        if (!authuser) {
            throw new UnauthorizedException(
                // The HTTP response status code will be 401
                'This email does not exist. Please try again.'
            );
        }

        // compare password (data string, encrypt string)
        const isValid = await compare(loginDto.password, authuser.dataValues.password);
        if ( !isValid ) {
            throw new UnauthorizedException("error password!!!")
        }

        // generate JWT token
        // payload payload constains the claims or the data being transferred (id)
        const payload = { user_id: authuser.id };
        const token = await this.jwtService.signAsync( payload, {
            secret: process.env.JWT_SECRET_KEY
        });

        //return token
        return { access_token: token };
    }

    async getUserProfile(id: number) {
        return await this.authUserModel.findByPk(id, {
            attributes: ['id', 'username', 'email'],
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
