import { IUserUpdate } from './interface/IUserUpdate';

export class UserUpdate {
    static from(user: any): IUserUpdate {
        let userUpdate: IUserUpdate = {};

        if (user.firstName)
            userUpdate.firstName = user.firstName;
        if (user.lastName)
            userUpdate.lastName = user.lastName;
        if (user.email)
            userUpdate.email = user.email;
        if (user.avatar)
            userUpdate.avatar = user.avatar;

        if (user.businessInfo)
            userUpdate.businessInfo = user.businessInfo;
        if (user.personalInfo)
            userUpdate.personalInfo = user.personalInfo;

        return userUpdate;
    }
}