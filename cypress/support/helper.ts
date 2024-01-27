import {faker} from '@faker-js/faker';
import { IUserInfo } from './types';

export class Helpers {
    getRandomName():string{
        return faker.person.firstName();
    }
    getRandomLastname():string{
        return faker.person.lastName();
    }
    getRandomPassword():string{
        return faker.string.sample();
    }
    createsNewUser():IUserInfo{
        const name:string = this.getRandomName();
        const lastname:string = this.getRandomLastname();
        const email = `${name}.${lastname}@example.com`
        const password:string = this.getRandomPassword();
        return {
            name,
            lastname,
            email,
            password
        }
    }
}

export const helpers = new Helpers();