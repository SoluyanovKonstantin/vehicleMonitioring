import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

const url = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  private userInfo = new BehaviorSubject<{ name: string | undefined }>({ name: undefined });
  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userId: string = '';
  public isAuth$: Observable<boolean> = this.isAuth.asObservable();
  public userInfo$ = this.userInfo.asObservable();

  logIn(name: string, password: string): Observable<{ name: string | undefined, id: string }> {
    return this.http.post<{ name: string | undefined, id: string }>(`${url}/users/login`, { name, password }).pipe(
      tap((res) => {
        this.userId = res.id;
        this.userInfo.next({ name: res.name });
        this.isAuth.next(true);
      }),
    )
  }

  logOut(): void {
    this.userInfo.next({ name: undefined });
    this.isAuth.next(false);
  }

  create(name: string, email: string, password: string): Observable<{ name: string | undefined, token: string }> {
    return this.http.post<{ name: string | undefined, token: string }>(`${url}/users/create`, { name, email, password })
  }

  deleteAccount() {
    this.http.delete<any>(`${url}/users/${this.userId}`).subscribe({
      next: () => {
        this.logOut();
      }
    });
  }
}
