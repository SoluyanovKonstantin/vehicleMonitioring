import { Injectable } from '@nestjs/common';
import { InjectConnection, Schema } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { MongoClient } from 'mongodb';
import { NONAME } from 'dns';
import mongoose from 'mongoose';

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

        console.log(user);

        return collection.findOne(user).then(res => {
            console.log(res._id.toString());
            return { name : res.name, id: res._id }
        });
    }

    deleteUser(userId: string) {
        const collection = this.connection.collection("users");

        return collection.updateOne({ _id: new mongoose.Types.ObjectId(userId) }, { $set: { 'isActive': 'none', 'removedAt': new Date() } }).then(res => {
            console.log(res);
        })
    }
}
