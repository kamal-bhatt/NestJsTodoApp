import { IsEmail, IsNotEmpty,IsOptional } from "class-validator"

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
    @IsOptional()
    firstName: string
    @IsOptional()
    lastName: string
}