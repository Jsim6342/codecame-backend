import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class ProductTag {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column() // default varchar(255)
  @Field(() => String)
  name: string;

  @ManyToMany(() => Product, (products) => products.productTags) // 양쪽 매핑 작업 필요
  @Field(() => [Product])
  products: Product[];
}
