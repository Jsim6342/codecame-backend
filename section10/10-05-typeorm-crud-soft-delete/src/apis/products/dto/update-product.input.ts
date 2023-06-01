import { InputType, OmitType, PartialType, PickType } from '@nestjs/graphql';
import { CreateProductInput } from './create-product.input';

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) {
  // 아래 내용들을 상속 받음
  // name?: stirng;
  // description?: string;
  // price?: number;
}

// Typescript 유틸리티 타입
// PickType(CreateProductInput, ['name', 'price']); => 선택
// OmitType(CreateProductInput, ['description']); => 빼기
// PartialType(CreateProductInput); => 물음표(있어도 되고 없어도 됨)
