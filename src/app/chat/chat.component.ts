import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map }from 'rxjs/operators';

import { Comment } from '../class/comment';
import { User } from '../class/user';

const CURRENT_USER: User = new User(1, 'Yuko Yamano');
const ANOTHER_USER: User = new User(2, 'Naomi Yamano');

@Component({
  selector: 'ac-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

   //2.comments = COMMENTS; 上の一時的なモックデータを保存している
  //4.このcommentsをhtmlでループ表示させる
  //comments = COMMENTS;
  currentUser = CURRENT_USER;
  //comment は、チャットエディターエリアの自分で入力するコメントのこと
  comment='';
  //from realtimeDatabase Firebase
  //item$: Observable<any>;
  comments$: Observable<Comment[]>;
  commentsRef: AngularFireList<Comment>;
  //AngularFireDatabaseは、サービス
  constructor(private db: AngularFireDatabase)
  {
    //オブジェクトメソッドを実行して、リアルタイムデータベースから単一データを取得する
    //その取得先が/itemという場所からデータを取得するという書き方
    //valueChanges()メソッドで取得したデータをオブザーバブルに変換してitem$に代入する
    //リアルタイムデータベースでは、単一データをobject()という扱いで管理している。
    //this.item$ = db.object('/item').valueChanges();
    //db.list(''/comments)の返り値がcommentsRefに代入されて、この値がvalueChanges()でオブザーバブルに変換されてcomments$に代入されている
    this.commentsRef=db.list('/comments');
    //valueChanges（）はリストの実データだけを取得するメソッドなので、これをデータキーを含めて取得するsnapshotChanges()に変更（オブザーバブルを返り値に持つ）する
    //->データの成型をする必要がある.pipe()
    this.comments$=this.commentsRef.snapshotChanges()
    .pipe(
      map((snapshots:SnapshotAction<Comment>[])=>{
        return snapshots.map(snapshot => {
          const value = snapshot.payload.val();
          return new Comment({ key: snapshot.payload.key, ...value});
        })
      })
    )
  }

  ngOnInit(): void {
  }

  addComment(comment: string): void {
    if (comment) {
      //こうすることで、ニューコメントがデータベースに保存される
      this.commentsRef.push(new Comment({ user: this.currentUser, message: comment }));
      //入力後に文字をリセット
      this.comment ='';
    }
  }

  updateComment(comment: Comment): void{
    const {key, message} = comment;
    //第一引数のkeyはデータを識別するため
    //第二引数は上書きするデータ
    //オブジェクトである{message}という書き方は、key名をmessage,value値に定数で定義されている上のmessageの値をセットしている
    this.commentsRef.update(key,{message});
  }

  deleteComment(comment: Comment): void{
    this.commentsRef.remove(comment.key);
  }

}
