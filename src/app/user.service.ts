import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(){

  }

  loadService(): Observable<User>{

    let u: User = JSON.parse(localStorage.getItem('user'));
    return of(u);
  }

}
