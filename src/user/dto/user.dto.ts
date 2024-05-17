import { 
    IsString, IsEmail, IsNotEmpty,
     IsStrongPassword, IsOptional, 
     IsNumberString, Length
} from "class-validator"

/*
    User Data Transfer Object  
    that represents valid "/user (POST)" JSON body requests.

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.

    Requirements:
    - Name string must not be empty.
    - CPF string must contain 11 digits. 
    - Email string must not be empty and must be email-like. 
    - Password string must not be empty and must be strong.

    A strong password must: 
    - be at least 8 characters long. 
    - have at least 1 lowercase character.
    - have at least 1 uppercase character.
    - have at least 1 numeric character.
    - have at least 1 symbol character (e.g., !, @, #, etc.). 
*/
export class UserCreateDTO{
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

/*
    User Data Transfer Object 
    that represents valid "/user:cpf (PATCH)" JSON body requests. 

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.

    Requirements:
    - Optional name string must not be empty.
    - Optional password string must not be empty and must be strong.
*/
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