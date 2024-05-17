import { IsString, IsNotEmpty, IsNumber } from "class-validator"
import { PartialType } from "@nestjs/mapped-types"
 
export class EquipmentCreateDTO{
    @IsString()
    @IsNotEmpty()
    type: string

    @IsNumber()
    amount: number
}

export class EquipmentUpdateDTO extends PartialType(EquipmentCreateDTO) {}