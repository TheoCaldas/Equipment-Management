import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RepositoryService } from 'src/repository/repository.service';
import { UserService } from 'src/user/user.service';
import { EquipmentService } from 'src/equipment/equipment.service';
import { RequestCreateDTO } from './dto/request.dto';

@Injectable()
export class RequestService {

    constructor(
        private readonly repoService: RepositoryService,
        private readonly userService: UserService,
        private readonly equipService: EquipmentService) {}

    async fetchRequests(){
        return await this.repoService.request.findMany()
    }

    async fetchRequestBy(id: number){
        const req = await this.repoService.request.findUnique({
            where: { id }
        })
        if (!req) throw new NotFoundException(`Request with ID ${id} not found`)
        return req
    }

    async createRequest(req: RequestCreateDTO){
        // get user
        const user = await this.userService.fetchUserBy(req.userCPF);
        // get equip
        const equip = await this.equipService.fetchEquipmentBy(req.equipType);
            
        // calc new total
        const newTotal = equip.total - req.amount
        if (newTotal >= 0){
            // update equip total and create request
            await this.equipService.updateEquip(equip.type, { total: newTotal } )
            return await this.repoService.request.create({ data: req })
        }else{
            throw new BadRequestException(`Not enough equips`)
        }
    }

    async deleteRequest(id: number){
        try {
            // get request
            const req = await this.fetchRequestBy(id)

            // get equip
            const equip = await this.equipService.fetchEquipmentBy(req.equipType)

            // calc new total (reverse)
            const newTotal = equip.total + req.amount

            // update equip total
            await this.equipService.updateEquip(equip.type, { total: newTotal } )

            return await this.repoService.request.delete({
                where: { id }
            });
        }
        catch (error) {
            this.repoService.handleNotFound(error, `Request with ID ${id} not found`)
        }
    }
}