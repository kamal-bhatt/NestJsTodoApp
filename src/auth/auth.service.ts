import { Model } from 'mongoose';
import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt/dist';
import { SignInDto, SignUpDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schemas/users.schema';
import { Session } from '../schemas/session.schema';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>, @InjectModel(Session.name) private sessionModel: Model<Session>, private jwt: JwtService, private configService: ConfigService) { }
    async signIn(dto: SignInDto) {
        let user = await this.userModel.findOne({
            email: dto.email
        }).exec()
        if (user) {
            if (await argon.verify(user.password, dto.password)) {
                user.password = undefined;
                return this.getTokens(user._id.toString(), user.email)
            } else {
                throw new UnauthorizedException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }
    async signUp(dto: SignUpDto) {
        const user = await this.userModel.find({
            email: dto.email
        }).exec()
        console.log(user)
        if (user.length === 0) {
            //generate the password hash
            console.log("ddddddd")
            const password = (await argon.hash(dto.password)).toString();
            delete dto.password;
            const createdUser = new this.userModel({
                email: dto.email, password: password, firstName: dto.firstName, lastName: dto.lastName
            });
            const savedUser = await createdUser.save();
            savedUser.password = undefined;
            return this.getTokens(savedUser._id.toString(), savedUser.email);
        } else {
            throw new ConflictException()
        }
    }
    async refreshToken(email: String, token: string) {
        const session = await this.sessionModel.findOne({
            email: email
        }).exec()
        console.log(session,email,token,session.refresh_token_hash)
        if (session) {
            let tokenver = await argon.verify(session.refresh_token_hash, token)
            console.log(tokenver)
            if (tokenver) {
                return this.getTokens(session._id.toString(), session.email);
            } else {
                console.log("ssssssss")
                throw new UnauthorizedException()
            }
        } else {
            throw new UnauthorizedException()
        }
    }
    async getTokens(userId: string, email: string) {
        const payload = {
            sub: userId,
            email: email
        }
        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret: this.configService.get('ACCESSTOKEN_SECRET')
        })
        const rtoken = await this.jwt.signAsync(payload, {
            expiresIn: '15000m',
            secret: this.configService.get('REFRESHTOKEN_SECRET')
        })
        const sessionObj = await this.sessionModel.findOne({
            email: email
        })
        if (sessionObj) {
            console.log("ddddddd")
            await this.sessionModel.findOneAndUpdate({
                email: email
            }, {
                refresh_token_hash: (await argon.hash(rtoken)).toString(),
                access_token_hash: (await argon.hash(token)).toString()
            })
        } else {
            await new this.sessionModel({
                email: email,
                refresh_token_hash: (await argon.hash(rtoken)).toString(),
                access_token_hash: (await argon.hash(token)).toString()
            }).save()
        }
        return {
            access_token: token,
            refresh_token: rtoken
        }
    }
}
