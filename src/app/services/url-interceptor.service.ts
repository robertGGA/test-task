import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "@environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UrlInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(
      req.clone(
        {
          url: req.url.startsWith('https') || req.url.startsWith('/')
            ? req.url
            : [environment.url, req.url].join('/')
        })
    )
  }
}
