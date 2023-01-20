export interface Users {
    username: string;
    password: string;
    id: number;
    role: 'ADMIN' | 'USER';
}