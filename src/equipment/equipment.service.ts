import { Injectable } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { EquipmentCreateDTO, EquipmentUpdateDTO } from './dto/equipment.dto';
import { NotFoundException } from '@nestjs/common'; 

/* 
    Equipment Service handles /equipment CRUD requests. 
    Connects to database via Repository Service. 
*/
@Injectable()
export class EquipmentService {

    constructor(private readonly repoService: RepositoryService){}

    async fetchEquipments(){
        return await this.repoService.equipment.findMany()
    }

    async fetchEquipmentBy(type: string){
        const user = await this.repoService.equipment.findUnique({
            where: { type }
        })
        if (!user) throw new NotFoundException(`User with CPF ${type} not found`)
        return user
    }

    async createEquipment(equip: EquipmentCreateDTO){
        try {
            return await this.repoService.equipment.create({ data: equip })
        } 
        catch (error) {
            this.repoService.handleConflict(error, `Equip if type ${equip.type} already exists`)
        }
    }

    async updateEquip(type: string, updated: EquipmentUpdateDTO){
        try {
            return await this.repoService.equipment.update({
                where: { type },
                data: updated,
            });
        }
        catch (error) {
            this.repoService.handleNotFound(error, `Equip of type ${type} does not exists`)
        }
    }

    async deleteEquip(type: string){
        try {
            return await this.repoService.equipment.delete({
                where: { type }
            });
        }
        catch (error) {
            this.repoService.handleNotFound(error, `Equip of type ${type} does not exists`)
        }
    }
}
