import { Injectable, NotFoundException } from '@nestjs/common';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';

@Injectable()
export class UserService {
    private users: UserDTO[] = []

    fetchUsers(){
        return this.users
    }

    fetchUserBy(cpf: string){
        const user = this.users.find(user => user.cpf === cpf)
        if (!user) throw new NotFoundException(`User not found for CPF ${cpf}`)
        return user
    }

    createUser(user: UserDTO){
        this.users.push(user)
        return user
    }

    updateUser(cpf: string, updated: UserUpdateDTO){
        this.users = this.users.map(user => {
            if (user.cpf === cpf) return { ...user, ...updated }
            else return user
        })
        return this.fetchUserBy(cpf)
    }

    deleteUser(cpf: string){
        const removed = this.fetchUserBy(cpf)
        this.users = this.users.filter(user => user.cpf !== cpf)
        return removed
    }
}
