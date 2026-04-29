import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {

    @IsNotEmpty({ message: 'role required!!!' })
    role: string;

    @IsNotEmpty({ message: 'email required !!!'})
    @IsEmail({}, { message: 'The email format is incorrect.'})
    email: string;

    @IsNotEmpty({message: 'password required!!!'})
    password: string;
}