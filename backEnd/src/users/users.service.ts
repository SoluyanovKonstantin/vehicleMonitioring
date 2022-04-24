import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoClient } from 'mongodb';

interface User {
    name: string,
    password: string
}

@Injectable()
export class UsersService {
    constructor(@InjectConnection() private connection: Connection) { }

    createUser(user: User) {
        const collection = this.connection.collection("users");

        collection.insertOne(user, (err, res) => {

            if (err) {
                return console.log(err);
            }
            console.log(res);
            console.log(user);
        });
    }

    loginUser(user: User) {
        const collection = this.connection.collection("users");

        return collection.findOne(user).then(res => {
            return { name : res.name }
        });
    }
}
