import { Work } from 'src/work/work.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    works: Work[];
}
