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
    Equipment Controller accept /equipment endpoints, which are handled by Equipment Service.
    - GET /equipment
    - GET /equipment/:type
    - POST /equipment (with EquipmentCreateDTO body)
    - PATCH /equipment/:type (with EquipmentUpdateDTO body)
    - DELETE /equipment/:type
*/
@Controller('equipment')
export class EquipmentController {

    constructor (private readonly equipService: EquipmentService){}

    // Returns all equipments, or empty if none. 
    @Get()
    fetchEquipments(){
        return this.equipService.fetchEquipments()
    }

    // Returns single equipment with specified type.
    // Error 404 (Not Found) if failed. 
    @Get(':type')
    fetchEquipmentBy(@Param('type') type: string){
       return this.equipService.fetchEquipmentBy(type)
    }

    // Returns created equipment with EquipmentCreateDTO properties.
    // Error 400 (Bad Request) if failed. 
    @Post()
    createEquipment(@Body(ValidationPipe) equip: EquipmentCreateDTO){
        try {
            return this.equipService.createEquipment(equip)
        } catch (error) { 
            // if type conflict, throw bad request
            if (error instanceof ConflictException) {
              throw new BadRequestException(error.message);
            }
            throw error;
        }
    }

    // Returns updated equipment with EquipmentUpdateDTO properties and specified type. 
    // Error 400 (Bad Request) or 404 (Not Found) if failed. 
    @Patch(':type')
    updateEquip(@Param('type') type: string, @Body(ValidationPipe) update: EquipmentUpdateDTO){
        return this.equipService.updateEquip(type, update)
    }

    // Returns deleted equipment with specified type.
    // Error 404 (Not Found) if failed. 
    @Delete(':type') 
    deleteEquip(@Param('type') type: string){
        return this.equipService.deleteEquip(type)
    }
}
