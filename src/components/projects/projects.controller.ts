import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ProjectsService } from './projects.service';
import {
  CreateProjectDto,
  SearchProjectDto,
  UpdateProjectDto,
} from '@components/projects/project.dto';
import { ParamsWithId } from '@src/common/mongoId.validator';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('list')
  async getProjectList(@Query() params: SearchProjectDto) {
    return this.projectsService.getProjectsList(params);
  }

  @Get('full/:alias')
  async getPopulatedProject(@Param('alias') alias: string) {
    return this.projectsService.getPopulatedProject(alias);
  }

  @Get()
  async findAll() {
    return await this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param() { id }: ParamsWithId) {
    return await this.projectsService.findOneById(id);
  }

  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return await this.projectsService.create(createProjectDto);
  }

  @Patch()
  async update(@Body() updateProjectDto: UpdateProjectDto) {
    return await this.projectsService.update(updateProjectDto);
  }

  @Delete(':id')
  async remove(@Param() { id }: ParamsWithId) {
    return this.projectsService.remove(id);
  }
}
