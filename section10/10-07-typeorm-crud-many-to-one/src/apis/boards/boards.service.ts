import { Injectable, Scope } from '@nestjs/common';
import { IBoardsServiceCreate } from './interfaces/boards-service.interface';
import { Board } from './entities/board.entity';

@Injectable({ scope: Scope.DEFAULT })
export class BoardsService {
  findAll(): Board[] {
    // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
    const result = [
      {
        number: 1,
        writer: '철수',
        title: '제목입니다~~',
        contents: '내용이에요@@@',
      },
      {
        number: 2,
        writer: '영희',
        title: '영희 제목입니다~~',
        contents: '영희 내용이에요@@@',
      },
      {
        number: 3,
        writer: '훈이',
        title: '훈이 제목입니다~~',
        contents: '훈이 내용이에요@@@',
      },
    ];

    // 2. 꺼내온 결과 응답 주기
    return result;
  }

  create({ createBoardInput }: IBoardsServiceCreate): string {
    // 1. 브라우저에서 보내준 데이터 확인하기
    console.log(createBoardInput.writer);
    console.log(createBoardInput.title);
    console.log(createBoardInput.contents);

    // 2. DB에 접속 후, 데이터를 저장 => 데이터 저장했다고 가정

    // 3. DB에 저장된 결과를 브라우저 응답(response) 추가
    return '게시물 등록에 성공하였습니다.';
  }
}
