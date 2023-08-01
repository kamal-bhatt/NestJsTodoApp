import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { Request } from 'express';
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../schemas/users.schema';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refreshtokenjwt') {
    constructor(configService: ConfigService, @InjectModel(User.name) private userModel: Model<User>) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('REFRESHTOKEN_SECRET')
        })
    }
     validate(payload:any) {
        return payload
    }
}