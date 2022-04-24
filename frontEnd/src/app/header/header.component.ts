import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PopupService } from '../popup.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isAuth$: Observable<boolean> = this.userService.isAuth$;
  userInfo$: Observable<{name: string | undefined}> = this.userService.userInfo$;

  constructor(
    private popupService: PopupService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  openLoginPopup(): void {
    this.popupService.openLoginPopup();
  }

  openSignUpPopup(): void {
    this.popupService.openSignUpPopup();
  }

  logOut(): void {
    this.userService.logOut();
  }

  deleteAccount(): void {
    this.userService.deleteAccount(); 
  }
}
