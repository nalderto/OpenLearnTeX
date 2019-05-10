import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { User } from '../user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Lesson } from './lesson';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user$: Observable<User>;
  user: User;
  numLessons: number;
  bs: string;
  private lessonCollection: AngularFirestoreCollection<Lesson>;
  lessons: Observable<Lesson[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService,
    public auth: AuthService
  ) {
    this.lessonCollection = this.afs.collection<Lesson>('lessons');
    this.lessons = this.lessonCollection.valueChanges();
    this.numLessons = 6;
    var zString = "";
    for (var j = 0; j < this.numLessons; j++) {
      zString += "0";
    }
    this.bs = zString;
  }

  ngOnInit() {
    this.userService.loadService().subscribe(u => {
      this.user = u;
    });
    if (this.user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${this.user.uid}`);
    userRef.ref.get().then(doc => {
      var passMap = 0;
      if (doc.data().passMap) {
        passMap = doc.data().passMap;
      }
      this.bs = this.decodeLessons(passMap);
    });
  }
  }
  hasPassed(i) {
    return this.bs[this.numLessons - i - 1] === "1";
  }

  decodeLessons(i) {
    let b = i.toString(2);
    var zString = "";
    for (var j = 0; j < this.numLessons; j++) {
      zString += "0";
    }
    return zString.substr(b.length) + b;

  }

}


