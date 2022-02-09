import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if(!currentUser){
            return next.handle(req);
        }
        const modifiedReq = req.clone(
            {
                params: new HttpParams().set('auth', currentUser.stsTokenManager.accessToken)
            }
        );
        return next.handle(modifiedReq);
    }
}