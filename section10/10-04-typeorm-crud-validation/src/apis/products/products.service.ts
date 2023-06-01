import {
  HttpException,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import {
  IProductServiceCheckSoldout,
  IProductServiceCreate,
  IProductServiceFindOne,
  IProductServiceUpdate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';

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

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<Product> {
    // 기존 로직을 재사용하여 통일
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 수행
    this.checkSoldout({ product });

    // this.productsRepository.create(); // 등록을 위해 빈 객체 생성
    // this.productsRepository.insert(); // return 값이 없는 저장 방법
    // this.productsRepository.update(); // return 값이 없는 수정 방법
    // this.productsRepository.save(); // 저장, 수정 기능.(id가 있으면 수정). return으로 객체 반환
    const result = this.productsRepository.save({
      ...product,
      ...updateProductInput, // 공통 key 값은 덮어씌워짐.
    });

    return result;
  }

  // 같은 검증이 반복적으로 사용(수정, 삭재)되므로 별도의 메서드로 분리
  checkSoldout({ product }: IProductServiceCheckSoldout): void {
    if (product.isSoldout) {
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');
    }

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     Httpstatus.UNPROCEASSABLE_ENTITY,
    //   );
    // }
  }
}
