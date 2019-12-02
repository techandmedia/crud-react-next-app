import { Task } from "./task.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}
