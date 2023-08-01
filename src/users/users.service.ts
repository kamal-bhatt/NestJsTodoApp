import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { use } from 'passport';
import { User } from '../schemas/users.schema';
import { UserDto } from './user.dto';
@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel:Model<User>){}
    async getUser(email:string){
        const user = await this.userModel.findOne({
            email:email
        })
        if(user){
        user.password = undefined;
        }
        return user
    }
    async updateUser(dto:UserDto){
        const userDoc = await this.userModel.findOneAndUpdate({
            email:dto.email
        },{
            firstName:dto.firstName,
            lastName:dto.lastName
        })
        if(userDoc){
            userDoc.password = undefined;
            return userDoc
        }else{
            throw new NotFoundException()
        }
    }
}
