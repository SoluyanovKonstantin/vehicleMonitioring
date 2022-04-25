import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';

const url = 'http://localhost:3000';

export interface iVehicle {
  _id: string,
  name: string,
  number: string
}

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient) { }

  private vehicles: iVehicle[] = [];
  private vehiclesSubject: Subject<iVehicle[]> = new Subject();
  vehicles$ = this.vehiclesSubject.asObservable()
  private choosedVehicleIndex: number = -1;

  setChoosedVehicleIndex(index: number ) {
    this.choosedVehicleIndex = index;
  }

  getChoosedVehicle(): iVehicle | null {
    return this.choosedVehicleIndex >= 0 ? this.vehicles[this.choosedVehicleIndex] : null;
  }

  getVehicles(userId: string): Observable<iVehicle[]> {
    return this.http.get<iVehicle[]>(`${url}/vehicles/${userId}`).pipe(tap(res => {
      this.vehicles.push(...res);
      this.vehiclesSubject.next(this.vehicles);
    }))
  }

  addVehicle(name: string, number: string, userId: string): Observable<{insertedId: string}> {
    return this.http.post<{insertedId: string}>(`${url}/vehicles/add`, { name, number, userId }).pipe(
      tap((res) => {
        this.vehicles.push({_id: res.insertedId, name, number});
        this.vehiclesSubject.next(this.vehicles);
      })
    )
  }

  editVehicle(name: string, number: string) {
    const id = this.getChoosedVehicle()?._id + '';
    return this.http.patch<iVehicle>(`${url}/vehicles/edit`, { name, number, id }).pipe(
      tap(res => {
        this.vehicles[this.choosedVehicleIndex] = res;
        this.vehiclesSubject.next(this.vehicles);
        this.setChoosedVehicleIndex(-1);
      })
    )
  }

  removeVehicle(id: number) {
    return this.http.delete(`${url}/vehicles/${this.vehicles[id]._id}`).pipe( tap( res => {
      this.vehicles = this.vehicles.filter( (item, index) => index !== id );
      this.vehiclesSubject.next(this.vehicles);
    } ) );
  }
}
