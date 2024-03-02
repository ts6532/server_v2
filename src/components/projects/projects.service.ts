import { Injectable } from '@nestjs/common';
import { ProjectRepository } from './projects.repository';
import { Project } from '@components/projects/project.schema';
import { FilterQuery, QueryOptions } from 'mongoose';
import {
  SearchProjectDto,
  ProjectDto,
  CreateProjectDto,
  UpdateProjectDto,
  ListProjectDto,
} from '@components/projects/project.dto';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectRepository) {}

  async getProjectsList(params: SearchProjectDto): Promise<ListProjectDto> {
    return await this.projectsRepository.getProjectsList(params);
  }

  async getPopulatedProject(alias: string) {
    return await this.projectsRepository.getPopulatedProject(alias);
  }

  async findAll() {
    return await this.projectsRepository.find({});
  }

  async findOne(
    filterQuery: FilterQuery<Project>,
    options?: QueryOptions<Project>,
  ): Promise<ProjectDto> {
    return await this.projectsRepository.findOne(filterQuery, options);
  }

  async findOneById(_id: string) {
    return this.findOne({ _id });
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    return await this.projectsRepository.create(createProjectDto);
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    const { id, ...data } = updateProjectDto;
    return await this.projectsRepository.update({ _id: id }, data);
  }

  async remove(_id: string): Promise<boolean> {
    return await this.projectsRepository.deleteMany({ _id });
  }
}
