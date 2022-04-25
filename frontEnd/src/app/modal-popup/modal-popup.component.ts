import { Component, HostBinding, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenedPopup } from '../openedPopup.enum';
import { PopupService } from '../popup.service';
import { UserService } from '../user.service';
import { iVehicle, VehicleService } from '../vehicle.service';


@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.component.html',
  styleUrls: ['./modal-popup.component.scss'],
})
export class ModalPopupComponent implements OnInit {

  @HostBinding('class.hide') isHidePopup: boolean = true;
  openedPopup = OpenedPopup;
  popUpName: OpenedPopup = this.openedPopup.nothing;
  choosedVehicle: iVehicle | null = null;
  isHidePassword = true;
  loginForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'password': new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  signUpForm: FormGroup = new FormGroup({
    'userName': new FormControl('', Validators.required),
    'email': new FormControl('', [Validators.required, Validators.email]),
    'password': new FormControl('', [Validators.required])
  })
  vehicleForm: FormGroup = new FormGroup({
    'name': new FormControl('', Validators.required),
    'number': new FormControl('', Validators.required)
  })

  constructor(
    private popUpService: PopupService,
    private userService: UserService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.popUpService.openedPopup$.subscribe(popUpName => {
      this.isHidePopup = false;
      this.popUpName = popUpName;
      this.vehicleForm.controls['name'].setValue(this.vehicleService.getChoosedVehicle()?.name);
      this.vehicleForm.controls['number'].setValue(this.vehicleService.getChoosedVehicle()?.number);
    })
  }

  changePasswordVisibility(event: any) {
    this.isHidePassword = !this.isHidePassword;
  }

  closePopup(): void {
    this.popUpName = this.openedPopup.nothing;
    this.isHidePopup = true;
    this.vehicleService.setChoosedVehicleIndex(-1);
  }

  signIn(): void {
    this.userService.logIn(this.loginForm.value.userName, this.loginForm.value.password).subscribe({
      next: () => {
        this.closePopup()
      },
      error: (err) => {
        this.loginForm.controls['userName'].setErrors({ notExist: true })
        this.loginForm.controls['password'].setErrors({ wrong: true })
      }
    });
  }

  signUp(): void {
    this.userService.create(this.signUpForm.value.userName, this.signUpForm.value.email, this.signUpForm.value.password).subscribe({
      next: (res) => {
        if (!res?.name) 
          this.loginForm.controls['userName'].setErrors({ notUnique: true })
        else
          this.closePopup()
      },
      error: (err) => {
        this.loginForm.controls['userName'].setErrors({ notUnique: true })
      }
    });
  }

  sendVehicle(): void {
    if (this.vehicleService.getChoosedVehicle()) {
      this.updateVehicle()
    } else {
      this.vehicleService.addVehicle(this.vehicleForm.value.name, this.vehicleForm.value.number, this.userService.userId).subscribe({
        next: () => {
          this.closePopup()
        },
        error: (err) => {
          this.loginForm.controls['userName'].setErrors({ notUnique: true })
        }
      });
    }
  }

  updateVehicle() {
    this.vehicleService.editVehicle(this.vehicleForm.value.name, this.vehicleForm.value.number).subscribe({
      next: (res) => {
        this.closePopup();
      }
    })
  }
}
