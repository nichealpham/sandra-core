import { IUserRegister } from './interface/IUserRegister';
import { IUserCreate } from './interface/IUserCreate';

import * as crypto from 'crypto';

export class UserRegister {
    static defaultData: IUserRegister = {
        email: '',
        password: '',

        firstName: '',
        lastName: '',

        accessToken: '',
        createdAt: new Date(),
    }

    static from(data: IUserCreate): IUserRegister {
        let userRegister = mergeWithoutExtend(this.defaultData, data);
        userRegister.accessToken = getRandomBytes(16);
        userRegister.createdAt = new Date();
        return userRegister;
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

function getRandomBytes(bytesLength: number = 8, encryption: string = 'hex'): string {
    return crypto.randomBytes(bytesLength).toString(encryption);
}