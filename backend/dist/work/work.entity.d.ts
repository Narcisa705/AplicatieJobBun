import { User } from 'src/users/user.entity';
export declare class Work {
    id: number;
    title: string;
    description: string;
    image: Buffer;
    clientUrl?: string;
    status: 'visible' | 'hidden';
    createdAt: Date;
    updatedAt: Date;
    user: User;
}
