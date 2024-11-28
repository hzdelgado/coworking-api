import { Test, TestingModule } from '@nestjs/testing';
import { EspacioController } from './espacio.controller';

describe('EspacioController', () => {
  let controller: EspacioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EspacioController],
    }).compile();

    controller = module.get<EspacioController>(EspacioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
