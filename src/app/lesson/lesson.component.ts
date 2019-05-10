import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import * as CodeMirror from 'codemirror';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
  editorContent: string;
  lessonNumber: number;
}

@Component({
  selector: 'result-dialog',
  templateUrl: 'result.html',
  styleUrls: ['./lesson.component.scss']
})
export class ResultDialog {
  message: string;
  submessage: string;
  loading: boolean;
  user: User;
  numLessons: number;
  bs: string;
  passed: boolean;
  constructor(
    public dialogRef: MatDialogRef<ResultDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private afs: AngularFirestore,
    private auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fns: AngularFireFunctions,
  
  ){
    this.numLessons = 6;
    var zString = "";
    for(var j = 0; j < this.numLessons; j++){
      zString += "0";
    }
    this.bs = zString;
    this.loading = false;
    this.userService.loadService().subscribe(u => {
      this.user = u;
    });
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    userRef.ref.get().then(doc => {
      var passMap = 0;
      if(doc.data().passMap){
        passMap = doc.data().passMap;
      }
      this.bs = this.decodeLessons(passMap);
    });
    this.loading = true;
    const callable = this.fns.httpsCallable('helloWorld');
    const p: Promise<any> = callable({data: data.editorContent, lessonNumber: data.lessonNumber}).toPromise();
    p.then((d) => {
      this.passed = d.result;
      if(d.result){
        this.dialogRef.addPanelClass('success');
        if(!this.hasPassed(data.lessonNumber)){
          this.auth.passLesson(this.user.uid, data.lessonNumber);
        }
        this.message = 'Correct!';
        this.submessage = 'Way to go!';
      }else{
        this.dialogRef.addPanelClass('failure');
        this.message = 'Incorrect!';
        this.submessage = 'Try Again';
      }
      this.loading = false;
    });


  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  hasPassed(i){
    return this.bs[this.numLessons - i - 1] === "1";
  }

  decodeLessons(i){
    let b = i.toString(2);
    var zString = "";
    for(var j = 0; j < this.numLessons; j++){
      zString += "0";
    }
    return zString.substr(b.length) + b;

  }
}


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss']
})
export class LessonComponent implements OnInit {
  lessonNumber: number;
  user: User;
  lessonContent: string;
  @ViewChild('editor')private codeEditor;
  numLessons: number;
  bs: string;
  loading: boolean;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private fns: AngularFireFunctions,
    public dialog: MatDialog
  ) { 
  }
  openDialog(): void {
    const editorContent = this.codeEditor.codeMirror.getValue();
    const dialogRef = this.dialog.open(ResultDialog,{
      width: '300px',
      data: {editorContent: editorContent, lessonNumber: this.lessonNumber}
    });
  }



  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.lessonNumber = params.number;
    });
    this.getContent();
    //this.auth.passLesson(this.user.uid, this.lessonNumber);
    //Example: 
    //this.auth.setUserData(this.user$.uid, {lessonNumber: this.lessonNumber});
    
  }

  getContent() {
    const lessonRef = this.afs.doc(`lessons/lesson${this.lessonNumber}`);
    lessonRef.ref.get().then(doc => {
      this.lessonContent = doc.data().content;
    });
  }
  checkSolution(){
    this.openDialog();

  }

}
