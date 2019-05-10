import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Observable, of } from 'rxjs';
import { User } from '../user.model';

@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class UserProfileComponent implements OnInit {
  user: User;

  constructor(public auth: AuthService, private userService: UserService) { 
    
  }

  ngOnInit(){
    //this.userService.loadService().subscribe(user$ => this.user$ = user$);
    this.userService.loadService().subscribe(u =>{
      this.user = u;
    });
  }

}
