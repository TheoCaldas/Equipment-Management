import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RepositoryModule } from 'src/repository/repository.module';
import { UserService } from 'src/user/user.service';
import { EquipmentService } from 'src/equipment/equipment.service';

@Module({
  imports: [RepositoryModule],
  controllers: [RequestController],
  providers: [RequestService, UserService, EquipmentService]
})
export class RequestModule {}
