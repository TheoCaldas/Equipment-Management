import { 
    Body, Controller, Param, 
    Get, Post, Delete,
    ValidationPipe,
    ParseIntPipe
} from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestCreateDTO } from './dto/request.dto';

/* 
    Request Controller accept /request endpoints, which are handled by Request Service.

    Posting requests automatically updates total of specified equipment in stock.
    Also, the request is not created if total amount should be less than zero.

    Requests can be reverted by deleting them, which automatically updates the total
    equip amount back. 

    - GET /request
    - GET /request/:id
    - POST /equipment (with RequestCreateDTO body)
    - DELETE /equipment/:id
*/
@Controller('request')
export class RequestController {

    constructor (private readonly reqService: RequestService){}

    // Returns all requests, or empty if none. 
    @Get()
    fetchRequests(){
        return this.reqService.fetchRequests()
    }

    // Returns single request with specified id.
    // Error 404 (Not Found) if failed.  
    @Get(':id')
    fetchRequestBy(@Param('id', ParseIntPipe) id: number){
       return this.reqService.fetchRequestBy(id)
    }

    // Returns created request with RequestCreateDTO properties.
    // Fails if amount of specified equipment is greater than its total.
    // Updates specified equipment total.
    // Error 400 (Bad Request) or 404 (Not Found) if failed.
    @Post()
    createRequest(@Body(ValidationPipe) req: RequestCreateDTO){
        return this.reqService.createRequest(req)
    }

    // Returns deleted request with specified id.
    // Updates related equipment total.
    // Error 404 (Not Found) if failed. 
    @Delete(':id') 
    deleteRequest(@Param('id', ParseIntPipe) id: number){
        return this.reqService.deleteRequest(id)
    }
}
