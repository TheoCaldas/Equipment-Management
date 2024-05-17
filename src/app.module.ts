import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';
import { EquipmentModule } from './equipment/equipment.module';

@Module({
  imports: [UserModule, RepositoryModule, EquipmentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
