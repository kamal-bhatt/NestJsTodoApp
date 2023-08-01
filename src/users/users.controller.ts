import { Controller, Get, UseGuards} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { ConfigService } from '@nestjs/config/dist';
import { AccessTokenJwtGuard } from '../auth/guard';
import { getUser } from '../auth/decorators';
import { User } from '../schemas/users.schema';
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService, private configService: ConfigService) { }
    @UseGuards(AccessTokenJwtGuard)
    @Get()
    get(@getUser() user:User) {
        console.log(user)
        return user;
    }
}
