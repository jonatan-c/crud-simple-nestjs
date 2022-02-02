import { Tasks } from './models/tasks.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Tasks])],
  exports: [TypeOrmModule],
  controllers: [TasksController],
  providers: [TasksService],
})
export class TasksModule {}
