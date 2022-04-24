import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenedPopup } from '../openedPopup.enum';
import { PopupService } from '../popup.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {

  @HostBinding('class.hide') isHidePopup: boolean = true;
  openedPopup = OpenedPopup;
  popUpName: OpenedPopup = this.openedPopup.nothing;
  isHidePassword = true;
  loginForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  signUpForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  constructor(
    private popUpService: PopupService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.popUpService.openedPopup$.subscribe( popUpName => {
      this.isHidePopup = false;
      this.popUpName = popUpName;
    })
  }

  changePasswordVisibility(event: any) {
    this.isHidePassword = !this.isHidePassword;
  }
  
  closePopup(): void {
    this.popUpName = this.openedPopup.nothing;
    this.isHidePopup = true;
  }

  signIn(): void {
    this.userService.logIn(this.loginForm.value.userName, this.loginForm.value.password).subscribe();
    this.closePopup();
  }

  signUp(): void {
    this.userService.create(this.signUpForm.value.userName, this.signUpForm.value.email, this.signUpForm.value.password).subscribe();
    this.closePopup();
  }
}
