import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@database/entity.repository';
import { Project, ProjectDocument } from './project.schema';
import { HttpException, HttpStatus } from '@nestjs/common';
import { SearchProjectDto } from '@components/projects/project.dto';

export class ProjectRepository extends EntityRepository<ProjectDocument> {
  constructor(
    @InjectModel(Project.name)
    protected readonly projectModel: Model<ProjectDocument>,
  ) {
    super(projectModel);
  }

  async getPopulatedProject(alias: string) {
    try {
      return await this.projectModel.findOne({ alias }).populate('category');
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении проекта',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getProjectsList(params: SearchProjectDto) {
    const { filter, limit, skip } = params;

    const query: Record<string, any> = {};

    if (filter) query.category = filter;

    try {
      const total = await this.projectModel.countDocuments(query);

      const projects = await this.projectModel
        .find(query)
        .limit(+limit || 9)
        .skip(+skip || 0);

      return { projects, total };
    } catch (error) {
      throw new HttpException(
        'Ошибка при получении проекта',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
