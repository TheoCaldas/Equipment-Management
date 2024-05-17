import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

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
}
