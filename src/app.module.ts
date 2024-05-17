import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { RepositoryModule } from './repository/repository.module';

@Module({
  imports: [UserModule, RepositoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
