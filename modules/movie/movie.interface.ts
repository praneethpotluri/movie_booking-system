


export interface IMovie {
    _id: string;
    title: string;
    description: string;
    duration: number;
    releaseDate: Date;
    genre: string[];
    rating: number;
    posterUrl: string;
    language: string;
    votes: number;
    format?: string[];
}