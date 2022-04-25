import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    name: string;

    @Prop()
    password: string;

    @Prop()
    isActive: boolean;

    @Prop()
    removedAt: Date;
}

export const UserSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    password: String,
    isActive: Boolean,
    removedAt: Date
})