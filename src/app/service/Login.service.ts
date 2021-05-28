import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {IssueTypes} from '../models/IssueTypes';
import {ConcreteProject} from '../models/ConcreteProject';
import {LoginDto} from '../models/loginDto';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    baseUrl = 'http://localhost:8080/api';

    constructor(private httpClient: HttpClient) {
    }

    public httpPost(email: string, token: string, url: string): Observable<any> {
        // return this.http.get<IssueTypes[]>('api/projects/');
        return this.httpClient.get<any>(`api/login/'${url}/${email}/${token}`);
    }


    public postLoginDto(loginDto: LoginDto): Observable<LoginDto> {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        console.log(loginDto);
        console.log(httpOptions);
        return this.httpClient.put<LoginDto>('api/login/', loginDto, httpOptions);
    }


}
