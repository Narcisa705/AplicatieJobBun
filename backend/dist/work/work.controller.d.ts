import { WorkService } from './work.service';
import { Work } from './work.entity';
export declare class WorkController {
    private readonly workService;
    constructor(workService: WorkService);
    findAll(): Promise<Work[]>;
    findOne(id: number): Promise<Work>;
    create(workData: Partial<Work>, file: Express.Multer.File): Promise<Work>;
    update(id: number, workData: Partial<Work>, file: Express.Multer.File): Promise<Work>;
    toggleStatus(id: number): Promise<Work>;
    remove(id: number): Promise<void>;
    getWorksByUserId(id: number): Promise<Work[]>;
    findByStatus(status: 'visible' | 'hidden'): Promise<Work[]>;
    getTotalWorkCount(): Promise<number>;
}
