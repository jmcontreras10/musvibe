export interface IUser {
    id?: number | null;
    email: string;
    name: string;
    gender?: string | null;
    birthdate?: Date | null;
};