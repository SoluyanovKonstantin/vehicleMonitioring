import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ModalPopupComponent } from './modal-popup/modal-popup.component';
import { OpenedPopup } from './openedPopup.enum';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor() { }

  private openedPopup = new Subject<OpenedPopup>();
  public openedPopup$ = this.openedPopup.asObservable();

  openLoginPopup() {
    this.openedPopup.next(OpenedPopup.login);
  }

  openSignUpPopup() {
    this.openedPopup.next(OpenedPopup.signUp);
  }

  openVehiclePopup() {
    this.openedPopup.next(OpenedPopup.vehicle);
  }
}
