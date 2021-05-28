import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, Validators, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {EMPTY, Observable, of} from 'rxjs';
import 'rxjs/add/operator/delay';

import {AuthenticationService} from '../../core/services/auth.service';
import {NotificationService} from '../../core/services/notification.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {LoginDto} from '../../models/loginDto';
import {LoginService} from '../../service/Login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    loading: boolean;
    loginDto: LoginDto;
    baseUrl = 'http://localhost:8080/api/';
    private params = new HttpParams();

    constructor(private router: Router,
                private titleService: Title,
                private loginService: LoginService,
                private notificationService: NotificationService,
                private authenticationService: AuthenticationService,
                private httpClient: HttpClient) {
    }

    ngOnInit() {
        this.titleService.setTitle('angular-material- template - Login');
        this.authenticationService.logout();
        this.createForm();
    }

    private createForm() {
        const savedUserEmail = localStorage.getItem('savedUserEmail');

        this.loginForm = new FormGroup({
            email: new FormControl(savedUserEmail, [Validators.required, Validators.email]),
            password: new FormControl('', Validators.required),
            url: new FormControl('', Validators.required),
            rememberMe: new FormControl(savedUserEmail !== null)
        });
    }


    newLogin() {
        const email = this.loginForm.get('email').value;
        const token = this.loginForm.get('password').value;
        const url = this.loginForm.get('url').value;

        this.loginService.httpPost(email, token, url).subscribe();


        // this.loginService.postLoginData(this.loginDto).subscribe();

        this.router.navigate(['/']);

    }

    login() {
        const email = this.loginForm.get('email').value;
        const password = this.loginForm.get('password').value;
        const rememberMe = this.loginForm.get('rememberMe').value;

        this.loginDto = new LoginDto();
        this.loginDto.email = this.loginForm.get('email').value;
        this.loginDto.token = this.loginForm.get('password').value;


        this.loginService.postLoginDto(this.loginDto).subscribe(
            res => console.log(res)
        );


        this.loading = true;
        this.authenticationService
            .login(email.toLowerCase(), password)
            .subscribe(
                data => {
                    if (rememberMe) {
                        localStorage.setItem('savedUserEmail', email);
                    } else {
                        localStorage.removeItem('savedUserEmail');
                    }
                    this.router.navigate(['/']);
                },
                error => {
                    this.notificationService.openSnackBar(error.error);
                    this.loading = false;
                }
            );
    }



    resetPassword() {
        this.router.navigate(['/auth/password-reset-request']);
    }
}
