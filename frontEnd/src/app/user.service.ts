import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private userInfo = new BehaviorSubject<{name: string | undefined}>({name: undefined});
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();
  public userInfo$ = this.userInfo.asObservable();

  logIn(name: string, password: string): Observable<{name: string | undefined, token: string}> {
    return this.http.post<{name: string | undefined, token: string}>('http://localhost:3000/users/login', {name, password}).pipe(
      tap((res) => {
        console.log(res);
        this.userInfo.next({name: res.name});
        this.isAuth.next(true);
      }),
    )
  }

  create(name: string, email: string, password: string): Observable<{name: string | undefined, token: string}> {
    return this.http.post<{name: string | undefined, token: string}>('http://localhost:3000/users/create', {name, email, password}).pipe(
      tap((res) => {
        console.log(res);
        this.userInfo.next({name: res.name});
        this.isAuth.next(true);
      }),
    )
  }
}
