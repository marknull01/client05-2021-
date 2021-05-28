import {AvatarUrls} from './AvatarUrls';
import {IssueTypes} from './IssueTypes';

export class ConcreteProject {
    private components: any;
    private avatarUrls: AvatarUrls = new AvatarUrls();
    // private hierarchyLevel: number;
    private roles: string;
    private _issueTypes: IssueTypes[] = [];
    private _name: string;
    private self: string;
    private _id: string;
    private _projectTypeKey: string;
    private _key: string;


    get issueTypes(): IssueTypes[] {
        return this._issueTypes;
    }

    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get projectTypeKey(): string {
        return this._projectTypeKey;
    }

    get key(): string {
        return this._key;
    }
}
