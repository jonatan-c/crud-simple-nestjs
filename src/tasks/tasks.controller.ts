import { CreateTaskDto } from './dto/tasks.dto';
/* eslint-disable prettier/prettier */
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('/')
  async getTasks(@Res() res) {
    const tasks = await this.tasksService.findAll();
    return res.status(HttpStatus.OK).json(tasks);
  }

  @Post('/')
  async createTask(@Res() res, @Body() createTask: CreateTaskDto) {
    const task = await this.tasksService.createTask(createTask);
    if (!task.title) {
      return res.status(HttpStatus.BAD_REQUEST).json('Title is required');
    }
    if (!task.description) {
      return res.status(HttpStatus.BAD_REQUEST).json('Description is required');
    }

    return res.status(HttpStatus.OK).json(task);
  }

  @Get('/:id')
  async getTask(@Res() res, @Param('id') id) {
    const task = await this.tasksService.getTaskById(id);
    return res.status(HttpStatus.OK).json(task);
  }

  @Put('/:id')
  async editTaskById(
    @Res() res,
    @Param('id') id: number,
    @Body() editTask: CreateTaskDto,
  ) {
    const task = await this.tasksService.editOne(id, editTask);
    return res.status(HttpStatus.OK).json(task);
  }

  @Delete('/:id')
  async deleteTaskById(@Res() res, @Param('id') id: number) {
    const task = await this.tasksService.deleteTaskById(id);
    return res.status(HttpStatus.OK).json('Task deleted');
  }
}
