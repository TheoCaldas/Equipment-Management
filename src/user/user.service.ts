import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';
import { RepositoryService } from 'src/repository/repository.service';
import { Prisma } from '@prisma/client';

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

    async createUser(user: UserDTO){
        try {
            return await this.repoService.user.create({ data: user })
        } 
        catch (error) {
            this.handleConflict(error)
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
            this.handleNotFound(error, cpf)
        }
    }

    async deleteUser(cpf: string){
        try {
            return await this.repoService.user.delete({
                where: { cpf }
            });
        }
        catch (error) {
            this.handleNotFound(error, cpf)
        }
    }

    // Mark: - Internal Prisma Error Handlers
    private handleConflict(error: any){
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002') {
              throw new ConflictException('CPF or email already taken');
        }
        throw error;
    }

    private handleNotFound(error: any, cpf: string){
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025') {
            throw new NotFoundException(`User with CPF ${cpf} not found`);
        }
        throw error;
    }
}
