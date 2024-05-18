import { IsString, IsNotEmpty, IsNumber, IsNumberString, Length, IsPositive} from "class-validator"
 
/*
    Request Data Transfer Object  
    that represents valid "/request (POST)" JSON body requests.

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.

     Requirements:
    - User CPF string must contain 11 digits. 
    - Equip Type string must not be empty. 
    - Amount must be positive number (greater than zero). 
*/
export class RequestCreateDTO{

    @IsString()
    @IsNotEmpty()
    @IsNumberString()
    @Length(11, 11)
    userCPF: string

    @IsString()
    @IsNotEmpty()
    equipType: string

    @IsNumber()
    @IsPositive()
    amount: number
}