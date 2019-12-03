import { CreateTaskDTO } from './dto/create-task.dto';
import { Injectable } from '@nestjs/common';
// import { Task, TaskStatus } from './tasks.model';
// import * as uuid from 'uuid/v1';

@Injectable()
export class TasksService {
  // private tasks: Task[] = [];

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  // getTaskById(id: string): Task {
  //   return this.tasks.find(task => task.id === id);
  // }

  // createTask(createTaskDto: CreateTaskDTO): Task {
  //   // Menggunakan DTO (Data Transfer Object)
  //   // Agar controller ini tidak perlu memperdulikan
  //   // bagaimana bentuk (shape) suatu model (parameter)
  //   // Dengan menggunakan DTO, kita tidak perlu lagi
  //   // Mendeskripsikan masing-masing dari parameter seperti
  //   // title dan description
  //   // Cukup melakukan perubahan di DTO, dan akan terefleksi
  //   // di controller dan di service
  //   const {title, description} = createTaskDto;
  //   // createTask(title: string, description: string): Task {
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     // title: createTaskDto.title,
  //     // description: createTaskDto.description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);
  //   return task;
  // }
}
