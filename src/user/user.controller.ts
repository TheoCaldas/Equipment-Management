import { 
    Body, Controller, Param, 
    Get, Post, Patch, Delete,
    ValidationPipe
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO, UserUpdateDTO } from './dto/user.dto';

@Controller('user')
export class UserController {

    constructor (private readonly userService: UserService){}

/* 
    Main Routes:
        GET /user
        GET /user/:email
        GET /user/:cpf

        POST /user (body)

        PATCH /user/:cpf (body)

        DELETE /user/:cpf
*/
    @Get()
    fetchUsers(){
        return this.userService.fetchUsers()
    }

    @Get(':cpf')
    fetchUserBy(@Param('cpf') cpf: string){
       return this.userService.fetchUserBy(cpf)
    }

    @Post()
    createUser(@Body(ValidationPipe) user: UserDTO){
        return this.userService.createUser(user)
    }

    @Patch(':cpf')
    updateUser(@Param('cpf') cpf: string, @Body(ValidationPipe) update: UserUpdateDTO){
        return this.userService.updateUser(cpf, update)
    }

    @Delete(':cpf') 
    deleteUser(@Param('cpf') cpf: string){
        return this.userService.deleteUser(cpf)
    }
}
