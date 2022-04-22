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
    return this.http.post<{name: string | undefined, token: string}>('https://6262bf1e005a66e1e3acc4e3.mockapi.io/auth', {name, password}).pipe(
      tap((res) => {
        this.userInfo.next({name: res.name});
        this.isAuth.next(true);
      }),
    )
  }
}
