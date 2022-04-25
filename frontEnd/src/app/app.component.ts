import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vehicleMonitoringFront';
  isAuth$: Observable<boolean> = this.userService.isAuth$;

  constructor(private userService: UserService) {}
}
