import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IMessage } from '@src/types/general';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectRepository } from './projects.repository';
import { PopulatedProjectDto } from '@components/projects/dto/populated-project.dto';
import { ProjectDto } from '@components/projects/dto/project.dto';
import { CreateProjectDto } from '@components/projects/dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private projectsRepository: ProjectRepository) {}

  async getPopulatedProject(alias: string): Promise<PopulatedProjectDto> {
    return new PopulatedProjectDto(
      await this.projectsRepository.getPopulatedProject(alias),
    );
  }

  async findAll(): Promise<ProjectDto[]> {
    const res = await this.projectsRepository.find({});
    return res.map((el) => new ProjectDto(el));
  }

  async findOne(_id: string): Promise<ProjectDto> {
    return new ProjectDto(await this.projectsRepository.findOne({ _id }));
  }

  async create(createProjectDto: CreateProjectDto): Promise<ProjectDto> {
    try {
      return new ProjectDto(
        await this.projectsRepository.create(createProjectDto),
      );
    } catch (e) {
      throw new HttpException(
        'Ошибка при создании проекта',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(updateProjectDto: UpdateProjectDto): Promise<ProjectDto> {
    const { _id, ...data } = updateProjectDto;

    try {
      return new ProjectDto(
        await this.projectsRepository.update({ _id }, data),
      );
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
