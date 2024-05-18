import { Injectable, NotFoundException } from '@nestjs/common';
import { UserCreateDTO, UserUpdateDTO } from './dto/user.dto';
import { RepositoryService } from '../repository/repository.service';

/* 
    User Service handles /user CRUD requests. 
    Connects to database via Repository Service. 
*/
@Injectable()
export class UserService {

    constructor(private readonly repoService: RepositoryService){}

    async fetchUsers(){
        return await this.repoService.user.findMany()
    }

    async fetchUserBy(cpf: string){
        const user = await this.repoService.user.findUnique({
            where: { cpf }
        })
        if (!user) throw new NotFoundException(`User with CPF ${cpf} not found`)
        return user
    }

    async createUser(user: UserCreateDTO){
        try {
            return await this.repoService.user.create({ data: user })
        } 
        catch (error) {
            this.repoService.handleConflict(error, "CPF or email already taken")
        }
    }

    async updateUser(cpf: string, updated: UserUpdateDTO){
        try {
            return await this.repoService.user.update({
                where: { cpf },
                data: updated,
            });
        }
        catch (error) {
            this.repoService.handleNotFound(error, `User with CPF ${cpf} not found`)
        }
    }

    async deleteUser(cpf: string){
        try {
            return await this.repoService.user.delete({
                where: { cpf }
            });
        }
        catch (error) {
            this.repoService.handleNotFound(error, `User with CPF ${cpf} not found`)
        }
    }
}
