import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {
    @IsNotEmpty({ message: 'name required!!!' })
    name: string;

    @IsNotEmpty({ message: 'lastname required!!!' })
    lastname: string;

    @IsNotEmpty({ message: 'address required!!!' })
    address: string;

    @IsNotEmpty({ message: 'phone number required!!!' })
    phone: string;

    @IsNotEmpty({ message: 'email required!!!' })
    @IsEmail({}, { message: 'The email format is incorrect.' })
    email: string;

    @IsNotEmpty({ message: 'password required!!!' })
    password: string;
}