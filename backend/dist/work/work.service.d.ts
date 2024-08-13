import { Repository } from 'typeorm';
import { Work } from './work.entity';
export declare class WorkService {
    private readonly workRepository;
    constructor(workRepository: Repository<Work>);
    create(work: Partial<Work>, image: Buffer): Promise<Work>;
    findAll(): Promise<Work[]>;
    findOne(id: number): Promise<Work>;
    update(id: number, workData: Partial<Work>, image?: Buffer): Promise<Work>;
    remove(id: number): Promise<void>;
    toggleStatus(id: number): Promise<Work>;
    findWorksByUserId(userId: number): Promise<Work[]>;
    findByStatus(status: 'visible' | 'hidden'): Promise<Work[]>;
    getTotalWorkCount(): Promise<number>;
}
