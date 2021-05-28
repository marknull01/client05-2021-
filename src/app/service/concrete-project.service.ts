import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Project} from '../models/Project';
import {IssueTypes} from '../models/IssueTypes';
import {ConcreteProject} from '../models/ConcreteProject';

@Injectable({
    providedIn: 'root'
})
export class ConcreteProjectService {
    constructor(private http: HttpClient) {
    }

    public getProjectById(id: string): Observable<ConcreteProject[]> {
        // return this.http.get<IssueTypes[]>('api/projects/');
        return this.http.get<ConcreteProject[]>(`api/project/'${id}`);
    }

}
