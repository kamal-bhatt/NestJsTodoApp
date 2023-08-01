import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { SignUpDto } from './dto';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should be a user',async()=>{
    let data = {email:"abc2@yopmail.com",password:'sss'}
    expect(await controller.signUp(data)).toBe(result);
  })
});
