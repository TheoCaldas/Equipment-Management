import { 
    Body, Controller, Param, 
    Get, Post, Delete,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestCreateDTO } from './dto/request.dto';


@Controller('request')
export class RequestController {

    constructor (private readonly reqService: RequestService){}

    @Get()
    fetchRequests(){
        return this.reqService.fetchRequests()
    }

    @Get(':id')
    fetchRequestBy(@Param('id', ParseIntPipe) id: number){
       return this.reqService.fetchRequestBy(id)
    }

    @Post()
    createRequest(@Body(ValidationPipe) req: RequestCreateDTO){
        return this.reqService.createRequest(req)
    }

    @Delete(':id') 
    deleteRequest(@Param('id', ParseIntPipe) id: number){
        return this.reqService.deleteRequest(id)
    }
}
