import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { auth } from 'firebase/app';
import { User } from './user.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService{

  user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private userService: UserService
    ) { 
      


		}
		async googleSignin() {
      this.afAuth.auth.setPersistence(auth.Auth.Persistence.LOCAL).then(async () => {
        const provider = new auth.GoogleAuthProvider();
        const credential = await this.afAuth.auth.signInWithPopup(provider);
        return this.updateUserData(credential.user);

      });
		}
	  public passLesson(uid, lessonNumber){
			const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
      userRef.ref.get().then(doc => {
        var passMap = 0;
        if(doc.data().passMap){
          passMap = doc.data().passMap;
        }

        passMap += Math.pow(2, lessonNumber);
        const o = {passMap: passMap};
        userRef.ref.update(o);

      });
      
    }

	  public setUserData(uid, data){
			const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
			return userRef.update(data);

    } 

		private updateUserData(user) {
			// Sets user data to firestore on login
			const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

			const data = { 
				uid: user.uid, 
				email: user.email, 
				displayName: user.displayName, 
				photoURL: user.photoURL
			} 
			localStorage.setItem('user', JSON.stringify(user));

      return userRef.set(data, { merge: true }).then(() => {
       location.reload();

      });

			}

			async signOut() {
				await this.afAuth.auth.signOut();
				localStorage.removeItem('user');
        location.reload();
			}

}
