import {AvatarUrls} from './AvatarUrls';

export class Project {
    private simplified: boolean;
    private avatarUrls: AvatarUrls = new AvatarUrls();
    private hierarchyLevel: number;
    private _name: string;
    private self: string;
    private _id: string;
    private projectTypeKey: string;
    private _key: string;


    get name(): string {
        return this._name;
    }

    get id(): string {
        return this._id;
    }

    get key(): string {
        return this._key;
    }
}
