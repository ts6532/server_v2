import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IEntity, IMessage } from '@src/types/general';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './projects.repository';
import { ProjectDocument } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectRepository) {}

  async getPopulatedProject(_id: string): Promise<ProjectDocument> {
    return this.projectsRepository.getPopulatedProject(_id);
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDocument> {
    try {
      return await this.projectsRepository.create(createProjectDto);
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при удалении проекта', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<ProjectDocument[]> {
    return this.projectsRepository.find({});
  }

  async findOne(_id: string): Promise<ProjectDocument> {
    return this.projectsRepository.findOne({ _id });
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectDocument> {
    const { _id, ...data } = updateProjectDto;

    try {
      return await this.projectsRepository.update({ _id }, data);
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при обновлении проекта', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(_id: string): Promise<IMessage> {
    try {
      await this.projectsRepository.deleteMany({ _id });
      return { message: 'Проект успешно удален' };
    } catch (error) {
      throw new HttpException(
        { message: 'Ошибка при удалении проекта', error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
