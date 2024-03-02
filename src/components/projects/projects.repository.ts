import {
  FullProjectDto,
  ListProjectDto,
  ListProjectsDto,
  SearchProjectDto,
  listProjectFields,
} from '@components/projects/project.dto';
import { EntityRepository } from '@database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema';

export class ProjectRepository extends EntityRepository<ProjectDocument> {
  constructor(
    @InjectModel(Project.name)
    protected readonly projectModel: Model<ProjectDocument>,
  ) {
    super(projectModel);
  }

  async getPopulatedProject(alias: string) {
    return await this.projectModel
      .findOne<FullProjectDto>({ alias })
      .populate('category');
  }

  async getProjectsList(params: SearchProjectDto): Promise<ListProjectsDto> {
    const { filter, limit, skip } = params;

    const query: Record<string, any> = {};

    if (filter) query.category = filter;

    const total = await this.projectModel.countDocuments(query);

    const results = await this.projectModel
      .find<ListProjectDto>(query)
      .limit(limit)
      .skip(skip)
      .select([...listProjectFields]);

    return { results, total };
  }
}
