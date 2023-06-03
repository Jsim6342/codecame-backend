import { Args, Resolver, Mutation, Query } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { CreateProductInput } from './dto/create-product.input';
import { Product } from './entities/product.entity';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver()
export class ProductsResolover {
  // 의존성 주입(private readonly 부여시 생략가능)
  constructor(
    private readonly productsService: ProductsService, //
  ) {}

  @Query(() => [Product]) // graphql
  fetchProducts(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Query(() => Product) // graphql
  fetchProduct(
    @Args('productId') productId: string, //
  ): Promise<Product> {
    return this.productsService.findOne({ productId });
  }

  @Mutation(() => Product) // graphql
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ): Promise<Product> {
    // <브라우저에 결과를 보내주는 2가지 방법>

    // 1. 등록된 내용이 담긴 객체를 그대로 브라우저에 리턴(등록된 내용을 곧바로 확인할 수 있기에 권장되는 방법)
    return this.productsService.create({ createProductInput }); // 중괄호 감싸기 - 구조분해할당

    // 2. 결과메시지만 간단히 보내주기
    // return '정상적으로 상품이 등록되었습니다.';
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    return this.productsService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(@Args('productId') productId: string): Promise<boolean> {
    return this.productsService.delete({ productId });
  }
}
