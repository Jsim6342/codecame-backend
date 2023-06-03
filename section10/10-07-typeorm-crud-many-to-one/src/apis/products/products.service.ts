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
  IProductServiceDelete,
  IProductServiceFindOne,
  IProductServiceUpdate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';

@Injectable({ scope: Scope.DEFAULT }) // Service Inject 역할
export class ProductsService {
  constructor(
    @InjectRepository(Product) // Repository Inject 역할
    private readonly productsRepository: Repository<Product>, // TypeOrm이 자동으로 생성(Module imports에서 설정)

    private readonly productsSaleslocationService: ProductSaleslocationsService,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  findOne({ productId }: IProductServiceFindOne): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id: productId },
      relations: ['productSaleslocation', 'productCategory'],
    });
  }

  // nest는 await 조건 기능을 명시하지 않아도 내장되어 있다.
  async create(
    { createProductInput }: IProductServiceCreate, // 중골호를 감싸서 받고, 타입스크립트로 객체 타입까지 정의해주면, 확실하게 보장된 데이터를 받을 수 있다.
  ): Promise<Product> {
    // // 리턴 타입 명시. 시간이 걸리는 작업이면 Promise를 붙여줘야 한다.
    // const result = this.productsRepository.save({
    //   ...createProductInput, // 스프레드 연산자

    //   //   name: createProductInput.name,
    //   //   description: createProductInput.description,
    //   //   price: createProductInput.price,
    // });

    const { productSaleslocation, productCategoryId, ...product } =
      createProductInput;

    // productsSaleslocation 저장(Service 활용)
    // 서비스를 활용하는 이유? 레파지토리에 직접 접근하면, 검증 로직을 통일 시킬 수 없다.
    const productSaleslocationResult =
      await this.productsSaleslocationService.create({ productSaleslocation });

    // product 저장
    const result = this.productsRepository.save({
      ...product,
      productSaleslocation: productSaleslocationResult,
      productCategoryId: {
        id: productCategoryId,
        // 만약에 name까지 클라이언트에 전달하고 싶다면? createProductInput에 name 까지 포함해서 받아오기.
      },
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

  async delete({ productId }: IProductServiceDelete): Promise<boolean> {
    // 1. 실제 삭제
    // const result = await this.productsRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productsRepository.update({ id: productId }, { isDeleted: true })

    // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productsRepository.update({ id: productId }, { deletedAt: new Date() });

    // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // 장점: 여러ID 한번에 지우기도 가능 => .softRemove([{id: qqq}, {id: aaa}])
    // 단점: id로만 삭제 가능
    // this.productsRepository.softRemove({ id: productId });

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    // 장점: 다른 컬럼으로도 삭제 가능
    // 단점: 여러ID 한번에 지우기 불가능
    const result = await this.productsRepository.softDelete({ id: productId });

    return result.affected ? true : false;
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
