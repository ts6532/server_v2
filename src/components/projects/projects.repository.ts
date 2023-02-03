import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@database/entity.repository';
import { Project, ProjectDocument } from './schemas/project.schema';
import { HttpException, HttpStatus } from '@nestjs/common';

export class ProjectRepository extends EntityRepository<ProjectDocument> {
  constructor(
    @InjectModel(Project.name)
    protected readonly userModel: Model<ProjectDocument>,
  ) {
    super(userModel);
  }

  async getPopulatedProject(alias: string): Promise<ProjectDocument> {
    try {
      return await this.userModel
        .findOne({ alias })
        .populate('category')
        .lean();
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении проекта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
