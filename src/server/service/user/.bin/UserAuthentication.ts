import { IUser } from './interface/IUser';
import { IUserAuthentication } from './interface/IUserAuthentication';

export class UserAuthentication {
    static defaultData: IUserAuthentication = {
        email: '',
        accessToken: '',
        _id: '',
    }

    static from(data: IUser): IUserAuthentication {
        return mergeWithoutExtend(this.defaultData, data);
    }
}

function mergeWithoutExtend(object1, object2) {
    let result = JSON.parse(JSON.stringify(object1));
    if (!object2)
        return result;
    for (let key in object1) {
        result[key] = object2[key] || object1[key];
    }
    return result;
}