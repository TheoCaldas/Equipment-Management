import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { EquipmentModule } from './equipment/equipment.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [UserModule, RepositoryModule, EquipmentModule, RequestModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
