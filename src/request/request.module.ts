import { Module } from '@nestjs/common';
import { RequestController } from './request.controller';
import { RequestService } from './request.service';
import { RepositoryModule } from '../repository/repository.module';
import { UserService } from '../user/user.service';
import { EquipmentService } from '../equipment/equipment.service';

@Module({
  imports: [RepositoryModule],
  controllers: [RequestController],
  providers: [RequestService, UserService, EquipmentService]
})
export class RequestModule {}
