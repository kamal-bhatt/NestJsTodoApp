import { Controller, Get, UseGuards, Query,Post,Body, HttpCode} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { AccessTokenJwtGuard } from '../auth/guard';
import { User } from '../schemas/users.schema';
import { UserDto } from './user.dto';
@Controller('user')
@UseGuards(AccessTokenJwtGuard)
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get()
    get(@Query() req:Request) {
        return this.usersService.getUser(req['email']);
    }
    @Post()
    @HttpCode(202)
    update(@Body() dto: UserDto){
        return this.usersService.updateUser(dto);
    }
}
