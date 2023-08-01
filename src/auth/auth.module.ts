import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/users.schema';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategy';
import {Session ,SessionSchema } from 'src/schemas/session.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Session.name, schema: SessionSchema }]),JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService,AccessTokenStrategy, RefreshTokenStrategy]
})
export class AuthModule {}
