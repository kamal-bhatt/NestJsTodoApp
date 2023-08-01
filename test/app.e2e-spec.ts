import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Todo, TodoDocument } from '../src/schemas/todos.schema';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true
    }))
    await app.init();
    let mockTodoModel = app.get<Model<Todo>>(getModelToken(Todo.name));
    ///mockTodoModel.remove()
    console.log(mockTodoModel)

  });
  describe("Auth", () => {
    describe("Signup", () => {
      it('should throw error on signup', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .expect(400)
      });
      it('should throw error if email not present', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .send({
            password: '123'
          })
          .expect(400)
      });
      it('should throw error if password not present', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .send({
            email: 'abc@yopmail.com'
          })
          .expect(400)
      });
      it('should signup a user', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .send({
            email: "abc@yopmail.com",
            password: '123'
          })
          .expect(201)
      });
      it('should throw error on duplicate email', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .send({
            email: "abc@yopmail.com",
            password: '123'
          })
          .expect(409)
      });
    })
    describe("SignIn", () => {
      it('should throw error on signIn', () => {
        return request(app.getHttpServer())
          .post('/signin')
          .expect(400)
      });
      it('should throw error if email not present', () => {
        return request(app.getHttpServer())
          .post('/signin')
          .send({
            password: '123'
          })
          .expect(400)
      });
      it('should throw error if password not present', () => {
        return request(app.getHttpServer())
          .post('/signin')
          .send({
            email: 'abc@yopmail.com'
          })
          .expect(400)
      });
      it('should signin a user', () => {
        return request(app.getHttpServer())
          .post('/signup')
          .send({
            email: "abc@yopmail.com",
            password: '123'
          })
          .expect(200)
      });
    })
  })
});
