import { IsString, IsNotEmpty, IsNumber, IsPositive } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
 
/*
    Equipment Data Transfer Object  
    that represents valid "/equipment (POST)" JSON body requests.

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.

    Requirements:
    - Type string must not be empty.
    - Total must be positive number (greater than zero). 
*/
export class EquipmentCreateDTO{
    @IsString()
    @IsNotEmpty()
    type: string

    @IsNumber()
    @IsPositive()
    total: number
}

/*
    Equipment Data Transfer Object  
    that represents valid "/equipment (PATCH)" JSON body requests.

    Class validator decorators automatically throw HTTP errors 
    when used with ValidationPipe.

    Requirements:
    - Optional type string must not be empty.
    - Optional total must be a number. 
*/
export class EquipmentUpdateDTO extends PartialType(EquipmentCreateDTO) {}