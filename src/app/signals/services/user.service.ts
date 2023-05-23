import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { SingleUserResponse, User } from '../interfaces/user-equest.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private http = inject(HttpClient);
  baseUrl= 'https://reqres.in/api/users';

  constructor() { }

  getUserById(id: number):Observable<User>{
    return this.http.get<SingleUserResponse>(`${this.baseUrl}/${id}`)
      .pipe(
        map(response => response.data),
        tap(console.log)
      )

  }
}
