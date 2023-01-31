import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '@database/entity.repository';
import { Project, ProjectDocument } from './schemas/project.schema';

export class ProjectRepository extends EntityRepository<ProjectDocument> {
  constructor(@InjectModel(Project.name) userModel: Model<ProjectDocument>) {
    super(userModel);
  }
}
