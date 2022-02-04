import { Component } from '@angular/core';



//1.一時的なモックデータをコメントオブジェクトとして保存-＞つまり、コメントクラスが必要になる-> ng g class class/comment comment.tsが作成される
//3.そのコメントクラスの中でデータ型を指定して、このファイル内でインポートに指定する
// const COMMENTS: Comment[] = [
//   new Comment(ANOTHER_USER, 'お疲れさまです！'),
//   new Comment(ANOTHER_USER, 'この間の件ですが、どうなりましたか？'),
//   new Comment(CURRENT_USER, 'お疲れさまです！'),
//   new Comment(CURRENT_USER, 'クライアントからOKが出ました！')
// ];

@Component({
  selector: 'ac-root',
  template: `
  <ac-chat></ac-chat>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {

 

}

//5.User機能を作るため、userクラスを作成する　user.ts 内に引数ありのコンストラクターを作成
//6.comment.tsにコメントとユーザーを紐づけていく