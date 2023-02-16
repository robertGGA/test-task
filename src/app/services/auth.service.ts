import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthModel} from "@models/auth-model";
import {LocalStorage} from "@utils/local-storage";
import {Token, TokenWrapper} from "@models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @LocalStorage() authorizeToken: string | undefined | null;
  @LocalStorage() key: string | undefined | null;

  constructor(private http: HttpClient) {
  }

  login(data: AuthModel): Observable<Token> {
    return this.http.post<Token>('test-auth-only', data);
  }

  getMainToken(token: string): Observable<TokenWrapper> {
    return this.http.get<TokenWrapper>('v1/authorization', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
  }

  saveKey(key: string): void {
    this.key = key;
  }
  authorize(token: string): void {
    this.authorizeToken = token;
  }
}
