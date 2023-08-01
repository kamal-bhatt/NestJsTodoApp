import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";

import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/users.schema';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'accesstokenjwt') {
    constructor(configService: ConfigService,@InjectModel(User.name) private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('ACCESSTOKEN_SECRET')
        })
    }
    async validate(payload: any) {
        const user = await this.userModel.findOne({
            email:payload.email
        }).exec()
        user.password = undefined;
        return user;
    }
}