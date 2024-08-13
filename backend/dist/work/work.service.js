"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const work_entity_1 = require("./work.entity");
let WorkService = class WorkService {
    constructor(workRepository) {
        this.workRepository = workRepository;
    }
    async create(work, image) {
        const newWork = this.workRepository.create({ ...work, image });
        return this.workRepository.save(newWork);
    }
    async findAll() {
        return this.workRepository.find();
    }
    async findOne(id) {
        return this.workRepository.findOneBy({ id });
    }
    async update(id, workData, image) {
        const work = await this.workRepository.preload({ id, ...workData });
        if (image) {
            work.image = image;
        }
        if (!work) {
            throw new Error('Work not found');
        }
        return this.workRepository.save(work);
    }
    async remove(id) {
        await this.workRepository.delete(id);
    }
    async toggleStatus(id) {
        const work = await this.workRepository.findOneBy({ id });
        if (!work) {
            throw new Error('Work not found');
        }
        work.status = work.status === 'visible' ? 'hidden' : 'visible';
        return this.workRepository.save(work);
    }
    async findWorksByUserId(userId) {
        return this.workRepository.find({
            where: { user: { id: userId } },
            relations: ['user'],
        });
    }
    async findByStatus(status) {
        return this.workRepository.find({ where: { status } });
    }
    async getTotalWorkCount() {
        const count = await this.workRepository.count();
        return count;
    }
};
exports.WorkService = WorkService;
exports.WorkService = WorkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(work_entity_1.Work)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], WorkService);
//# sourceMappingURL=work.service.js.map