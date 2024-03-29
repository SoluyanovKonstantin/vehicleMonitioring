import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Vehicle, VehicleDocument } from './vehicle.schema';

@Injectable()
export class VehiclesService {
    constructor(@InjectConnection() private connection: Connection, @InjectModel(Vehicle.name) private vehiclesModel: Model<VehicleDocument>) { }

    getVehiclesByUserId(id: string) {
        return this.vehiclesModel.find({userId: id}).exec().then( arr => arr.filter( item => item.isActive !== 'none' ) );
    }

    addVehicle({ name, number, userId }: { name: string, number: string, userId: string }) {
        const collection = this.connection.collection("vehicles");

        return collection.insertOne({ name, number, userId });
    }

    editVehicle({ name, number, id }) {
        return this.vehiclesModel.findByIdAndUpdate( id, { $set: { name, number } } ).exec().then( () => { return { name, number, _id: id }} )
    }

    removeVehicle({ id }: { id: string }) {
        return this.vehiclesModel.findByIdAndUpdate( id, { $set: { isActive: 'none', removedAt: new Date() } } )
    }
}
