import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from '../environments/environment';

@Injectable()
export class AuthService {
  token: any;

  constructor(private http: HttpClient) {}

  async signIn(body): Promise<string> {
    let token = await this.http
      .post<string>(`${environment.API_URL}/auth/sign-in`, body)
      .toPromise();

    this.setToken(token);
    return token;
  }

  getToken(): any {
    if (this.token) {
      return this.token;
    }
    let token = window.localStorage.getItem("authentication");
    if (token) {
      token = JSON.parse(token);
    }
    this.token = token;
    return token;
  }

  setToken(token: any): void {
    window.localStorage.setItem("authentication", JSON.stringify(token));
    this.token = token;
  }
}
