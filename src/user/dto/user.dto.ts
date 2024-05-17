import { 
    IsString, IsEmail, IsNotEmpty,
     IsStrongPassword, IsOptional, 
     IsNumberString, Length,
     length
} from "class-validator"

export class UserDTO{
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @Length(11, 11)
    cpf: string

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    password: string
}

export class UserUpdateDTO{
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string 

    @IsString()
    @IsNotEmpty()
    @IsStrongPassword()
    @IsOptional()
    password: string
}