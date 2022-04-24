import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop()
    _id: ObjectId;

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    isActive: boolean;

    @Prop()
    removedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);