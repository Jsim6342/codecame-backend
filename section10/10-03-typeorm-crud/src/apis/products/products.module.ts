import { Module } from '@nestjs/common';
import { ProductsResolover } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // 특정 테이블에 접근할 수 있는 권한 부여. ProductRepository를 의존성 주입받을 수 있다.
      Product, //
    ]),
  ],

  providers: [
    ProductsResolover, //
    ProductsService,
  ],
})
export class ProductsModule {}
