import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // default varchar(255)
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags) // 양쪽 매핑 작업 필요
  products: Product[];
}
