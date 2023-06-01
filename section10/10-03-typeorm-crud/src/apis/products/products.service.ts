import { Injectable, Scope } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  IProductServiceCreate,
  IProductServiceFindOne,
} from './interfaces/products-service.interface';

@Injectable({ scope: Scope.DEFAULT }) // Service Inject 역할
export class ProductsService {
  constructor(
    @InjectRepository(Product) // Repository Inject 역할
    private readonly productsRepository: Repository<Product>, // TypeOrm이 자동으로 생성(Module imports에서 설정)
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({ where: { id: productId } });
  }

  // nest는 await 조건 기능을 명시하지 않아도 내장되어 있다.
  create(
    { createProductInput }: IProductServiceCreate, // 중골호를 감싸서 받고, 타입스크립트로 객체 타입까지 정의해주면, 확실하게 보장된 데이터를 받을 수 있다.
  ): Promise<Product> {
    // 리턴 타입 명시. 시간이 걸리는 작업이면 Promise를 붙여줘야 한다.
    const result = this.productsRepository.save({
      ...createProductInput, // 스프레드 연산자

      //   name: createProductInput.name,
      //   description: createProductInput.description,
      //   price: createProductInput.price,
    });

    return result;
  }
}
