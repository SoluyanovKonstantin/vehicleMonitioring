import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel, Schema } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import mongoose from 'mongoose';
import { User, UserDocument } from './user.schema';

interface iUser {
    name: string,
    password: string
}

@Injectable()
export class UsersService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel(User.name) private userModel: Model<UserDocument>) { }

    createUser(user: iUser) {
        const collection = this.connection.collection('users');
        return collection.insertOne(user).catch((err) => {
            return err;
        });
    }

    loginUser(user: iUser) {
        const collection = this.connection.collection("users");

        return collection.findOne(user).then(res => {
            if (res?.isActive === 'none') throw new Error('deleted account')
            return { name : res?.name, id: res?._id }
        });
    }

    deleteUser(userId: string) {
        const collection = this.connection.collection("users");

        return collection.updateOne({ _id: new mongoose.Types.ObjectId(userId) }, { $set: { 'isActive': 'none', 'removedAt': new Date() } })
    }
}
