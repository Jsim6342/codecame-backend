import { Module } from '@nestjs/common';
import { ProductsResolover } from './products.resolver';
import { ProductsService } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductSaleslocation } from '../productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductSaleslocationsService } from '../productsSaleslocations/productsSaleslocations.service';
import { ProductTag } from '../productsTags/entities/productTag.entity';
import { ProductsTagsService } from '../productsTags/productsTags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      // 특정 테이블에 접근할 수 있는 권한 부여. ProductRepository를 의존성 주입받을 수 있다.
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
  ],

  providers: [
    ProductsResolover, //
    ProductsService,
    ProductSaleslocationsService,
    ProductsTagsService,
  ],
})
export class ProductsModule {}
