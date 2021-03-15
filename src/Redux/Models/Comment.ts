export interface Comment {
    body: string;
    dateTime: Date;
    foodId: number;
    id: number;
    sentiment: number;
    userDetails: {
        id: number,
        username: string
    };
    votes: number;
}