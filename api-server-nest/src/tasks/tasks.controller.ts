import { Controller, Get, Post, Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  // createTask(@Body() body) {
  createTask(
    @Body('title') title: string,
    @Body('description') description: string,
    ) {
    // console.log('Body', title, description);
    // tslint:disable-next-line: no-console
    console.log('Body', title, description);

    return this.tasksService.createTask(title, description);
  }
}
