
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Work } from './work.entity';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private readonly workRepository: Repository<Work>,
  ) {}

  async create(work: Partial<Work>, image: Buffer): Promise<Work> {
    const newWork = this.workRepository.create({ ...work, image });
    return this.workRepository.save(newWork);
  }

  async findAll(): Promise<Work[]> {
    return this.workRepository.find();
  }

  async findOne(id: number): Promise<Work> {
    return this.workRepository.findOneBy({ id });
  }

  async update(id: number, workData: Partial<Work>, image?: Buffer): Promise<Work> {
    const work = await this.workRepository.preload({ id, ...workData });
    if (image) {
      work.image = image;
    }
    if (!work) {
      throw new Error('Work not found');
    }
    return this.workRepository.save(work);
  }

  async remove(id: number): Promise<void> {
    await this.workRepository.delete(id);
  }

  async toggleStatus(id: number): Promise<Work> {
    const work = await this.workRepository.findOneBy({ id });
    if (!work) {
      throw new Error('Work not found');
    }

    work.status = work.status === 'visible' ? 'hidden' : 'visible';
    return this.workRepository.save(work);
  }

  async findWorksByUserId(userId: number): Promise<Work[]> {
    return this.workRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findByStatus(status: 'visible' | 'hidden'): Promise<Work[]> {
    return this.workRepository.find({ where: { status } });
  }


  async getTotalWorkCount(): Promise<number> {
    const count = await this.workRepository.count();
    return count;
  }
}
