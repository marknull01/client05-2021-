import {Component, DoCheck, OnInit} from '@angular/core';
import {NotificationService} from 'src/app/core/services/notification.service';
import {Title} from '@angular/platform-browser';
import {NGXLogger} from 'ngx-logger';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {Observable} from 'rxjs';
import {Project} from '../../models/Project';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ProjectService} from '../../service/ProjectService';
import {IssueTypes} from '../../models/IssueTypes';
import {ConcreteProjectService} from '../../service/concrete-project.service';
import {ConcreteProject} from '../../models/ConcreteProject';

@Component({
    selector: 'app-dashboard-home',
    templateUrl: './dashboard-home.component.html',
    styleUrls: ['./dashboard-home.component.css']
})


// export interface TypeTest {
//   name: string;
// }
//
// const Types: TypeTest[] = [
//   {name: 'Hydrogen1'},
//   {name: 'Hydrogen2'},
//   {name: 'Hydrogen3'},
// ];

export class DashboardHomeComponent implements OnInit {
    data: Object;
    url = 'https://teeesting-3.atlassian.net/rest/api/3/project';
    currentUser: any;
    projectArr: string[] = ['hello'];
    projectskek: string[] = [];
    projects1: Project[];

    public projects: Project[];
    public concreteProjects: ConcreteProject[];
    public issueTypes: IssueTypes[];

    constructor(private notificationService: NotificationService,
                private authService: AuthenticationService,
                private titleService: Title,
                private logger: NGXLogger,
                private http: HttpClient,
                private projectService: ProjectService,
                private concreteProjectService: ConcreteProjectService) {
    }


    makeRequest(): void {

        // console.log(outputArray);
        // this.getProjects();
        // console.log(this.projects);
    }


    // makeRequest2(): void {
    //   this.getProjects().subscribe(
    //       data => {
    //         this.projects1 = [];
    //         for(let key in data){
    //           this.projects1.push(data[key]);
    //         }
    //       }
    //   )
    //
    //   const outputArray = [];
    //   // tslint:disable-next-line:forin
    //   for (const element in jsonObject) {
    //     outputArray.push({
    //       id: element,
    //       name: jsonObject[element]
    //     });
    //   }
    //
    //
    //   console.log(outputArray);
    // }


    // public get(): void {
    //   const project = this.getProject(10000);
    //
    //   const get = project.map(function(item) {
    //     return item['id'];
    //   });
    //
    // }

    // public getProject(id: number): Observable<Project> {
    //   const url = `${this.url}/${id}`;
    //   return this.http.get<Project>(url);
    // }
    //
    // public getProject(): Observable<Project> {
    //   const url = `${this.url}`;
    //   return this.http.get<Project>(url);
    // }

    ngOnInit() {
        this.currentUser = this.authService.getCurrentUser();
        this.titleService.setTitle('angular-material-template - Dashboard');
        this.logger.log('Dashboard loaded');

        setTimeout(() => {
            this.notificationService.openSnackBar('Welcome!');
        });

        // this.getProjects();
        // while (this.projects != null) {
        //     console.log(this.projects);
        //     break;
    }


    // this.projects();


    private getProjects() {
        this.projectService.getAllProjects().subscribe(project => {
                this.projects = project;
            }
        );

        // this.projects.forEach(project => {
        //     this.projectArr.push(project.name);
        // });

        console.log(this.projects);
        console.log(this.projects.length);

        // this.projects.keys()
        console.log(this.projects.forEach(project => {
            this.projectArr.push(project.name);
            this.projectArr.push('tst');
            // this.projectArr  = project.name;
            console.log(project.name);
        }));
        // const jsonObject: any = this.(this.JSON2);

        // return this.http.get(this.url).pipe(map(res => res = res.json()['data']));
    }

    // ngDoCheck(): void {
    //     this.getProjects();
    // }

    getConcreteProject(id: string) {
        this.concreteProjectService.getProjectById(id).subscribe(concreteProject => {
                this.concreteProjects = concreteProject;
            }
        );
        console.log('TEST_____');
        console.log(this.concreteProjects);
        //
        // this.concreteProjects.forEach(issueType => {
        //     this.issueTypes.push(issueType.issueTypes);
        // })
    }
}
