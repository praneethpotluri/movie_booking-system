import { Types } from 'mongoose';



export interface IShow {
    id?: string;
    movie: Types.ObjectId;
    theater: Types.ObjectId;
    location: string;
    format: "2D" | "3D" | "IMAX";
    audioType?:string;
    startTime: string;
    date: string;
    priceMap:Record<string,number>;
    seatLayout:{
        row: string;
        seats :{
            number: number;
            status: "AVAILABLE" | "BOOKED" | "BLOCKED";
        }[];
    }[];
    createdAt?: Date;
    updatedAt?: Date;
    }
