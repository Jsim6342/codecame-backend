import { ProductCategory } from 'src/apis/productsCategories/entities/productsCategory.entity';
import { ProductSaleslocation } from 'src/apis/productsSaleslocations/entities/productsSaleslocation.entity';
import { ProductTag } from 'src/apis/productsTags/entities/productsTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column() // default varchar(255)
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ default: false }) // default tinyint(1)
  isSoldeout: boolean;

  @JoinColumn() // 연관관계 주인 컬러 명시
  @OneToOne(() => ProductSaleslocation)
  productSaleslocation: ProductSaleslocation;

  @ManyToOne(() => ProductCategory)
  productCategory: ProductCategory;

  @ManyToOne(() => User)
  user: User;

  @JoinTable() // 중간 매핑 테이블 생성(한 쪽에만 명시하면 됨)
  @ManyToMany(() => ProductTag, (productTags) => productTags.products) // 양쪽 매핑 작업 필요
  productTags: ProductTag[];
}
