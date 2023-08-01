import { Controller, Get,Post,Req,Body,UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { TodoService } from './todo.service';
import { AccessTokenJwtGuard } from '../auth/guard';
import { TodoDto } from './todo.dto';
@UseGuards(AccessTokenJwtGuard)
@Controller('todo')
export class TodoController {
    constructor(private todoService: TodoService) {}
    @Get()
    get(@Req() request: Request) {
        return this.todoService.getTodo(request.query.id)
    }

    @Post()
    post(@Body() dto: TodoDto) {
        console.log(dto)
        return this.todoService.createTodo(dto);
    }
}