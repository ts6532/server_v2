import { Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectRepository) {}
  
  async create(createProjectDto: CreateProjectDto) {
    return this.projectsRepository.create(createProjectDto);
  }

  async findAll() {
    return this.projectsRepository.find({});
  }

  async findOne(_id: string) {
    return this.projectsRepository.findOne({ _id });
  }

  async update(updateProjectDto: UpdateProjectDto) {
    const { _id, ...data } = updateProjectDto;
    return this.projectsRepository.update({ _id }, data);
  }

  async remove(_id: string) {
    return this.projectsRepository.deleteMany({ _id });
  }
}
