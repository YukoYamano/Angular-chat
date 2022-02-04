import { User } from './user';

export class Comment {
  user: User;
  message: string;
  date: number;
  //keyはオプションにするから？を付ける
  key?:string;
  //コメントデータが編集できるか判断する
  isEdit: boolean;

  constructor(value:any) {
    this.user = value.user;
    this.message= value.message;
    this.date = value.date || Date.now();
    if(value.key){
      this.key = value.key;
    }
  }

}
