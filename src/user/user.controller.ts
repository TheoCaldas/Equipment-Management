import { 
    Body, Controller, Param, 
    Get, Post, Patch, Delete,
    ValidationPipe,
    ConflictException,
    BadRequestException
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDTO, UserUpdateDTO } from './dto/user.dto';


/* 
    User Controller accept /user routes, which are handled by User Service.
    - GET /user
    - GET /user/:cpf
    - POST /user (with UserCreateDTO body)
    - PATCH /user/:cpf (with UserUpdateDTO body)
    - DELETE /user/:cpf
*/
@Controller('user')
export class UserController {

    constructor (private readonly userService: UserService){}

    // Returns all users, or empty if none. 
    @Get()
    fetchUsers(){
        return this.userService.fetchUsers()
    }

    // Returns single user with specified CPF.
    // Error 404 (Not Found) if failed. 
    @Get(':cpf')
    fetchUserBy(@Param('cpf') cpf: string){
       return this.userService.fetchUserBy(cpf)
    }

    // Returns created user with UserCreateDTO properties.
    // Error 400 (Bad Request) if failed. 
    @Post()
    createUser(@Body(ValidationPipe) user: UserCreateDTO){
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

    // Returns updated user with UserUpdateDTO properties and specified CPF. 
    // Error 400 (Bad Request) or 404 (Not Found) if failed. 
    @Patch(':cpf')
    updateUser(@Param('cpf') cpf: string, @Body(ValidationPipe) update: UserUpdateDTO){
        return this.userService.updateUser(cpf, update)
    }

    // Returns deleted user with specified CPF.
    // Error 404 (Not Found) if failed. 
    @Delete(':cpf') 
    deleteUser(@Param('cpf') cpf: string){
        return this.userService.deleteUser(cpf)
    }
}
