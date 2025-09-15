import { Injectable } from '@nestjs/common';

@Injectable()
export class CoreService {
    findAll() {
        return `This action returns all core`;
    }
}
