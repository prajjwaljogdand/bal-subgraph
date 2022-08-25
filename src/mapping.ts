import { Entry, TripData, Vehicle, Scam } from "../generated/schema";
import {logs, scam} from "../generated/Bal/Bal"
import { BigInt } from "@graphprotocol/graph-ts";


export function handleEntry(event:logs): void{

    let aggData = TripData.load("0");


    if(aggData === null){
        aggData = new TripData("0");
        aggData.count = BigInt.fromI32(0);
        aggData.numberOfVehicles = BigInt.fromI32(0);
        aggData.save();
    }

    let trip = Entry.load(event.transaction.hash.toHex());
    let vehicle = Vehicle.load(event.params.truckId);

    if(vehicle === null){
        vehicle = new Vehicle(event.params.truckId);
        vehicle.numberOfTrips = BigInt.fromI32(0);
        aggData.numberOfVehicles = aggData.numberOfVehicles.plus(BigInt.fromI32(1));
        vehicle.save();
    }

    if(trip === null){
    trip =  new Entry(event.transaction.hash.toHex());
    trip.txHash = event.transaction.hash.toHex();
    trip.block = event.block.number;
    trip.truckId = event.params.truckId;
    trip.timeOut = event.params.timeOut;
    trip.weight = event.params.weight;
    aggData.count = aggData.count.plus(BigInt.fromI32(1));

    trip.save();
    aggData.save();

   }
    trip.txHash = event.transaction.hash.toHex();
    trip.block = event.block.number;
    trip.truckId = event.params.truckId;
    trip.timeOut = event.params.timeOut;
    trip.weight = event.params.weight;
    vehicle.numberOfTrips = vehicle.numberOfTrips .plus(BigInt.fromI32(1));
    trip.save();
    aggData.save(); 
    vehicle.save();  

}

export function handleScam(event:scam): void{

    let trip = Scam.load(event.transaction.hash.toHex());

    if(trip === null){

    trip =  new Scam(event.transaction.hash.toHex());
    trip.txHash = event.transaction.hash.toHex();
    trip.block = event.block.number;
    trip.truckId = event.params.truckId;
    trip.timeOut = event.params.time;
    trip.weight = event.params.weight;
    trip.save();

   }
    trip.txHash = event.transaction.hash.toHex();
    trip.block = event.block.number;
    trip.truckId = event.params.truckId;
    trip.timeOut = event.params.time;
    trip.weight = event.params.weight;
    trip.save();

}