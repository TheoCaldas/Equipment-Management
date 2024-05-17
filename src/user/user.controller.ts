import { 
    Body, Controller, Param, 
    Get, Post, Patch, Delete,
    ValidationPipe,
    ConflictException,
    BadRequestException
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
        try {
            return this.userService.createUser(user)
        } catch (error) { 
            // if email or cpf conflict, throw bad request
            if (error instanceof ConflictException) {
              throw new BadRequestException(error.message);
            }
            throw error;
        }
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
