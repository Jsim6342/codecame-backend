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
  IProductServiceDelete,
  IProductServiceFindOne,
  IProductServiceUpdate,
  IProductsServiceCreate,
} from './interfaces/products-service.interface';
import { UpdateProductInput } from './dto/update-product.input';
import { ProductSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Injectable({ scope: Scope.DEFAULT }) // Service Inject 역할
export class ProductsService {
  constructor(
    @InjectRepository(Product) // Repository Inject 역할
    private readonly productsRepository: Repository<Product>, // TypeOrm이 자동으로 생성(Module imports에서 설정)

    private readonly productsSaleslocationService: ProductSaleslocationsService,

    private readonly productsTagsService: ProductsTagsService,
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
  async create({
    createProductInput,
  }: IProductsServiceCreate): Promise<Product> {
    // 1. 상품만 등록하는 경우
    // const result = this.productsRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하는 방식
    //   //   name: '마우스',
    //   //   description: '좋은 마우스',
    //   //   price: 3000,
    // });

    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, productCategoryId, productTags, ...product } =
      createProductInput; // 로직 설명 1

    // @@@ 왜 아래 에러가 발생하는지 고민해보고 고쳐보기(Typescript를 써야하는 이유와 관련) -> 영상 5:30 @@@
    // 2-1) 상품거래위치 등록
    const result = await this.productsSaleslocationService.create({
      ...productSaleslocation, // 서비스를 타고 가는 이유는...?(레파지토리에 직접 접근하면 안될까...?) => 검증을 서비스에서 진행하기 때문
    }); // 로직 설명 2

    // 2-2) 상품태그 등록
    // productTags가 ["#전자제품", "#영등포", "#컴퓨터"]와 같은 패턴으로 가정
    const tagNames = productTags.map((el) => el.replace('#', '')); // ["전자제품", "영등포", "컴퓨터"] // 로직 설명 4
    const prevTags = await this.productsTagsService.findByNames({ tagNames }); // 로직 설명 5

    const temp = [];
    tagNames.forEach((el) => {
      const exists = prevTags.find((prevEl) => el === prevEl.name);
      if (!exists) temp.push({ name: el });
    }); // 로직 설명 6
    const newTags = await this.productsTagsService.bulkInsert({ names: temp }); // 로직 설명 7

    const tags = [...prevTags, ...newTags.identifiers]; // newTags.identifiers  =>  등록된 id 배열. ex, [{ id: aaa }, { id: qqq }, ...]
    // 1. 실무에서 반드시 for문 써야하는 경우가 아니면, for문 잘 안 씀 => map, forEach 사용
    // 2. for안에서 await를 사용하지 않음 => 안티패턴 => Promise.all 사용
    // 3. DB에 동일한 패턴 데이터를 반복적으로 등록하지 않음(네트워크 왔다갔다 비효율) => bulk-insert 사용

    // 2-3) 상품 등록
    const result2 = await this.productsRepository.save({
      ...product,
      productSaleslocation: result, // result 통째로 넣기 vs id만 빼서 넣기
      productCategory: {
        id: productCategoryId,
        // 만약에, name 까지 받고싶으면 2가지 방법?
        //   1) createProductInput에서 카테고리 name도 받아오기
        //   2) productCategoryId를 사용해서 카테고리 name을 조회하기
      },
      productTags: tags,

      // 하나하나 직접 나열하는 방식
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // productSaleslocation: {
      //   id: result.id,
      // },
    }); // 로직 설명 8

    // 최종 결과 돌려주기
    return result2; // 로직 설명 9
  }

  async update({
    productId,
    updateProductInput,
  }: IProductServiceUpdate): Promise<void> {
    // 기존 로직을 재사용하여 통일
    const product = await this.findOne({ productId });

    // 검증은 서비스에서 수행
    this.checkSoldout({ product });

    // this.productsRepository.create(); // 등록을 위해 빈 객체 생성
    // this.productsRepository.insert(); // return 값이 없는 저장 방법
    // this.productsRepository.update(); // return 값이 없는 수정 방법
    // this.productsRepository.save(); // 저장, 수정 기능.(id가 있으면 수정). return으로 객체 반환

    // @@@ 왜 아래 에러가 발생하는지 고민해보고 고쳐보기(Typescript를 써야하는 이유와 관련) -> 영상 5:30 @@@
    // const result = this.productsRepository.save({
    //   ...product,
    //   ...updateProductInput, // 공통 key 값은 덮어씌워짐.
    // });

    // return result;
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
