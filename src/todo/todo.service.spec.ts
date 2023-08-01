import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should createTodo be defined', () => {
    expect(service.createTodo).toBeDefined();
  });
  it('should getTodo be defined', () => {
    expect(service.getTodo).toBeDefined();
  });
});
