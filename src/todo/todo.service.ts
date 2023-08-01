import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from '../schemas/todos.schema';
import { TodoDto } from './todo.dto';
@Injectable()
export class TodoService {
    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
    createTodo(todo:TodoDto){
        todo['date'] = new Date();
        const createdTodo = new this.todoModel(todo);
        return createdTodo.save();
    }
    getTodo(id){
        if(id){ 
            return this.todoModel.find({_id:id}).exec();
        }else{
            return this.todoModel.find().exec();
        }
    }
}
