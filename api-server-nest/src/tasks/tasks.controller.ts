import { CreateTaskDTO } from './dto/create-task.dto';
import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { Task } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   return this.tasksService.getTaskById(id);
  // }

  // @Post()
  // // createTask(@Body() body) {
  // createTask(
  //   // Menggunakan DTO (Data Transfer Object)
  //   // Agar controller ini tidak perlu memperdulikan
  //   // bagaimana bentuk (shape) suatu model (parameter)
  //   // Dengan menggunakan DTO, kita tidak perlu lagi
  //   // Mendeskripsikan masing-masing dari parameter seperti
  //   // title dan description
  //   // Cukup melakukan perubahan di DTO, dan akan terefleksi
  //   // di controller dan di service
  //   @Body() createTaskDto: CreateTaskDTO
  //   // @Body('title') title: string,
  //   // @Body('description') description: string,
  //   ): Task {
  //   // console.log('Body', title, description);
  //   // console.log('Body', title, description);
    
  //   // tslint:disable-next-line: no-console
  //   console.log('Body', createTaskDto);

  //   return this.tasksService.createTask(createTaskDto);
  //   // return this.tasksService.createTask(title, description);
  // }
}
