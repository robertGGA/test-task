import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "@services/auth.service";
import {TableModel} from "@models/table-model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private authService: AuthService) {
  }

  getUsers(search: string = '', limit?: number, offset?: number): Observable<TableModel> {
    const params = ((search !== null || limit || offset) ? '/passes?' : '') + (search ? `search=first_name=${search}` : '') + (limit ? `&limit=${limit}` : '') + (offset ? `&offset=${offset}` : '');
    return this.http.get<TableModel>(`v1/${this.authService.authorizeToken}${params}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authService.key!
      }
    })
  }

  sendMessage(userId: number, dateStart: Date, pushMessage: string) {
    return this.http.post(`v1/${this.authService.authorizeToken}/message/push`, {
      "user_id": userId,
      "date_start": dateStart,
      "push_message": pushMessage
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.authService.key!
      }
    })
  }
}
