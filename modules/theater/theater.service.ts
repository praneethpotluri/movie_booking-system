import { TheaterModel } from "./theater.model";
import { ITheater } from "./theater.interface";

export const createTheater = async (data: ITheater): Promise<ITheater> => {
    return await TheaterModel.create(data);
};

export const getAllTheaters = async (): Promise<ITheater[]> => {
    return await TheaterModel.find();
};


export const getTheaterById = async (id: string): Promise<ITheater | null> => {
    return await TheaterModel.findById(id);
};

export const TheaterByState = async (state: string): Promise<ITheater[]> => {
    return await TheaterModel.find({ state :{ $regex: state, $options: 'i' } });
};
