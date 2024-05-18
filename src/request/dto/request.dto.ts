import { IsString, IsNotEmpty, IsNumber, IsNumberString, Length} from "class-validator"
 
/*
    Request Data Transfer Object  
    that represents valid "/equipment (POST)" JSON body requests.

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.
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
    amount: number
}