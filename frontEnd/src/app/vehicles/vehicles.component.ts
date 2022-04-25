import { Component, OnInit } from '@angular/core';
import { PopupService } from '../popup.service';
import { UserService } from '../user.service';
import { VehicleService } from '../vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {

  constructor(private popupService: PopupService, private userService: UserService, private vehicleService: VehicleService) { }

  vehicles$ = this.vehicleService.vehicles$;

  ngOnInit(): void {
    this.vehicleService.getVehicles(this.userService.userId).subscribe();
  }

  showVehiclePopup(vehicleIndexInArray: number): void {
    if (vehicleIndexInArray >= 0) this.vehicleService.setChoosedVehicleIndex(vehicleIndexInArray);
    this.popupService.openVehiclePopup();
  }

  deleteVehicle(index: number) {
    this.vehicleService.removeVehicle(index).subscribe();
  }

}
