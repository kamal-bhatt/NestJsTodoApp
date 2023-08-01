import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: './.'+process.env.NODE_ENV+'.env',
    isGlobal:true
  }),MongooseModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => ({
      uri: config.get('DATABASE_URL'),
    })}),UsersModule, TodoModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
