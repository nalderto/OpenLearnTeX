import { Component, OnInit} from '@angular/core';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
