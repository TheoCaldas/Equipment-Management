import { 
    Body, Controller, Param, 
    Get, Post, Patch, Delete,
    ValidationPipe,
    ConflictException,
    BadRequestException
} from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { EquipmentCreateDTO, EquipmentUpdateDTO } from './dto/equipment.dto';

/* 
    Equipment Controller accept /equipment routes, which are handled by Equipment Service.
    - GET /equipment
    - GET /equipment/:type
    - POST /equipment (with EquipmentCreateDTO body)
    - PATCH /equipment/:type (with EquipmentUpdateDTO body)
    - DELETE /equipment/:type
*/
@Controller('equipment')
export class EquipmentController {

    constructor (private readonly equipService: EquipmentService){}

    @Get()
    fetchEquipments(){
        return this.equipService.fetchEquipments()
    }

    @Get(':type')
    fetchEquipmentBy(@Param('type') type: string){
       return this.equipService.fetchEquipmentBy(type)
    }

    @Post()
    createEquipment(@Body(ValidationPipe) equip: EquipmentCreateDTO){
        try {
            return this.equipService.createEquipment(equip)
        } catch (error) { 
            if (error instanceof ConflictException) {
              throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    @Patch(':type')
    updateEquip(@Param('type') type: string, @Body(ValidationPipe) update: EquipmentUpdateDTO){
        return this.equipService.updateEquip(type, update)
    }

    @Delete(':type') 
    deleteEquip(@Param('type') type: string){
        return this.equipService.deleteEquip(type)
    }
}
