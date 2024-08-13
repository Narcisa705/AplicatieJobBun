
import { Controller, Get, Param, Post, Body, Delete, UploadedFile, UseInterceptors, Patch, HttpException, HttpStatus } from '@nestjs/common';
import { WorkService } from './work.service';
import { Work } from './work.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  findAll(): Promise<Work[]> {
    return this.workService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Work> {
    return this.workService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() workData: Partial<Work>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Work> {
    return this.workService.create(workData, file.buffer);
  }

  @Post(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() workData: Partial<Work>,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Work> {
    return this.workService.update(id, workData, file?.buffer);
  }

  @Patch(':id/status')
  toggleStatus(@Param('id') id: number): Promise<Work> {
    return this.workService.toggleStatus(id);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.workService.remove(id);
  }

  @Get('user/:id')
  getWorksByUserId(@Param('id') id: number) {
    return this.workService.findWorksByUserId(id);
  }

  @Get('status/:status')
  async findByStatus(@Param('status') status: 'visible' | 'hidden'): Promise<Work[]> {
    if (status !== 'visible' && status !== 'hidden') {
      throw new HttpException('Invalid status', HttpStatus.BAD_REQUEST);
    }
    return this.workService.findByStatus(status);
  }
  @Get('count')
  async getTotalWorkCount(): Promise<number> {
    return this.workService.getTotalWorkCount();
  }
}
