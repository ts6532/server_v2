import {
  CreateProjectDto,
  SearchProjectDto,
  UpdateProjectDto,
} from '@components/projects/project.dto';
import { Project } from '@components/projects/project.schema';
import { Injectable } from '@nestjs/common';
import { FilterQuery, QueryOptions } from 'mongoose';
import { ProjectRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectRepository) {}

  async getProjectsList(params: SearchProjectDto) {
    return this.projectsRepository.getProjectsList(params);
  }

  async getPopulatedProject(alias: string) {
    return await this.projectsRepository.getPopulatedProject(alias);
  }

  async findAll() {
    return await this.projectsRepository.find();
  }

  async findOne(
    filterQuery: FilterQuery<Project>,
    options?: QueryOptions<Project>,
  ) {
    return await this.projectsRepository.findOne(filterQuery, options);
  }

  async findOneById(_id: string) {
    return this.findOne({ _id });
  }

  async create(createProjectDto: CreateProjectDto) {
    return await this.projectsRepository.create(createProjectDto);
  }

  async update(updateProjectDto: UpdateProjectDto) {
    const { id, ...data } = updateProjectDto;
    return await this.projectsRepository.update({ _id: id }, data);
  }

  async remove(_id: string) {
    return await this.projectsRepository.deleteMany({ _id });
  }
}
