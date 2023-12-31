import { Transform } from "class-transformer"
import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto{
    @IsEmail()
    @IsNotEmpty()
    email:string
    
    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsNotEmpty()
    lastname:string
    
    @Transform(({value})=>value.trim())
    @IsString()
    @IsNotEmpty()
    password:string
}