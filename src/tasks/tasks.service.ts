/* eslint-disable prettier/prettier */
import { CreateTaskDto, EditTaskDto } from './dto/tasks.dto';
import { ITasks, IEditTask } from './interfaces/tasks.interface';

import { Tasks } from './models/tasks.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks)
    private readonly tasksRespository: Repository<ITasks>,
  ) {}

  async findAll(): Promise<ITasks[]> {
    return await this.tasksRespository.find();
  }

  async createTask(createTask: CreateTaskDto) {
    return await this.tasksRespository.save(createTask);
  }

  async getTaskById(id: number): Promise<ITasks> {
    return await this.tasksRespository.findOne(id);
  }

  async editOne(id: number, editTask: EditTaskDto): Promise<IEditTask> {
    const post = await this.getTaskById(id);
    const editedPost = Object.assign(post, editTask);
    return await this.tasksRespository.save(editedPost);
  }

  async deleteTaskById(id: number): Promise<ITasks> {
    const task = await this.getTaskById(id);
    if (!task) throw new NotFoundException('Task not found');

    return await this.tasksRespository.remove(task);
  }
}
