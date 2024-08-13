import { UsersService } from './users.service';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(userData: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
    getUserByEmail(email: string): Promise<User>;
}
