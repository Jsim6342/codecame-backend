import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column() // default varchar(255)
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false }) // default tinyint(1)
  @Field(() => Boolean)
  isSoldout: boolean;

  @JoinColumn() // 연관관계 주인 컬러 명시
  @OneToOne(() => ProductSaleslocation)
  @Field(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable() // 중간 매핑 테이블 생성(한 쪽에만 명시하면 됨)
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 양쪽 매핑 작업 필요
  @Field(() => [ProductTag])
  productTags: ProductTag[];

  @CreateDateColumn() // 데이터 등록시 등록 시간 자동으로 추가
  createdAt: Date;

  @UpdateDateColumn() // 데이터 수정시 수정 시간 자동으로 추가
  updatedAt: Date;

  @DeleteDateColumn() // 소프트삭제 시간 기록을 위함
  deletedAt: Date;
}
