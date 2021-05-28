import {Injectable, Inject} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
import * as moment from 'moment';
import 'rxjs/add/operator/delay';

import {environment} from '../../../environments/environment';
import {of, EMPTY, Observable} from 'rxjs';
import {LoginDto} from '../../models/loginDto';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private loginDto: LoginDto;

    constructor(private http: HttpClient,
                @Inject('LOCALSTORAGE') private localStorage: Storage) {
    }

    login(email: string, token: string) {
        this.loginDto = new LoginDto();
        this.loginDto.email = email;
        this.loginDto.token = token;

        this.http.post<LoginDto>('http://localhost:8080/api/login', this.loginDto);


        return of(true).delay(1000)
            .pipe(map((/*response*/) => {
                // set token property
                // const decodedToken = jwt_decode(response['token']);

                // store email and jwt token in local storage to keep user logged in between page refreshes
                this.localStorage.setItem('currentUser', JSON.stringify({
                    email: email,
                    token: token,
                }));

                return true;
            }));
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.localStorage.removeItem('currentUser');
    }

    getCurrentUser(): any {
        // TODO: Enable after implementation
        // return JSON.parse(this.localStorage.getItem('currentUser'));
        return {
            token: 'aisdnaksjdn,axmnczm',
            isAdmin: true,
            email: 'john.doe@gmail.com',
            id: '12312323232',
            alias: 'john.doe@gmail.com'.split('@')[0],
            expiration: moment().add(1, 'days').toDate(),
            fullName: 'John Doe'
        };
    }

    passwordResetRequest(email: string) {
        return of(true).delay(1000);
    }

    changePassword(email: string, currentPwd: string, newPwd: string) {
        return of(true).delay(1000);
    }

    passwordReset(email: string, token: string, password: string, confirmPassword: string): any {
        return of(true).delay(1000);
    }


    signIn(model: LoginDto): Observable<any> {
        console.log({email: model.email, password: model.token});
        return this.http.post('/api/login', JSON.stringify({email: model.email, password: model.token}),
            {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                }),
                responseType: 'text'
            });
    }
}
