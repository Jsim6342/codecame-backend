import { InjectRepository } from '@nestjs/typeorm';
import { ProductSaleslocation } from './entities/productsSaleslocation.entity';
import { Repository } from 'typeorm';

export class ProductSaleslocationsService {
  constructor(
    @InjectRepository(ProductSaleslocation)
    private readonly producsSaleslocationsRepository: Repository<ProductSaleslocation>,
  ) {}

  create({ productSaleslocation }) {
    return this.producsSaleslocationsRepository.save({
      ...productSaleslocation,
    });
  }
}
