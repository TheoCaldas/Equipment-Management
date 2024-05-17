import { Injectable, OnModuleInit, OnModuleDestroy, 
    ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';

/* 
    Repository Service connects to database defined by prisma/schema.prisma .
*/
@Injectable()
export class RepositoryService extends PrismaClient
 implements OnModuleInit, OnModuleDestroy {

    async onModuleInit() {
        await this.$connect
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }

    // Mark: - Internal Prisma Error Handlers
    handleConflict(error: any, message: string){
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2002') {
              throw new ConflictException(message);
        }
        throw error;
    }

    handleNotFound(error: any, message: string){
        if (error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === 'P2025') {
            throw new NotFoundException(message);
        }
        throw error;
    }
}
