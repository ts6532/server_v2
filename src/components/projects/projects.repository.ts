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

  async getPopulatedProject(_id: string): Promise<ProjectDocument> {
    try {
      return await this.userModel.find({ _id }).populate('category').lean();
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении проекта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
