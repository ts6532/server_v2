import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { SessionAuthGuard } from '@components/auth/session-auth.guard';
import { ProjectDto } from './dto/project.dto';
import { ApiTags } from '@nestjs/swagger';
import { IMessage } from '@src/types/general';
import { PopulatedProjectDto } from './dto/populated-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get('full/:_id')
  async getPopulatedProject(
    @Param(':_id') _id: string,
  ): Promise<PopulatedProjectDto> {
    return new PopulatedProjectDto(
      await this.projectsService.getPopulatedProject(_id),
    );
  }

  @UseGuards(SessionAuthGuard)
  @Get()
  async findAll(): Promise<ProjectDto[]> {
    const res = await this.projectsService.findAll();
    return res.map((el) => new ProjectDto(el));
  }

  @UseGuards(SessionAuthGuard)
  @Get(':_id')
  async findOne(@Param('_id') _id: string): Promise<ProjectDto> {
    return new ProjectDto(await this.projectsService.findOne(_id));
  }

  @UseGuards(SessionAuthGuard)
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ProjectDto> {
    return new ProjectDto(await this.projectsService.create(createProjectDto));
  }

  @UseGuards(SessionAuthGuard)
  @Put()
  async update(
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ProjectDto> {
    return new ProjectDto(await this.projectsService.update(updateProjectDto));
  }

  @UseGuards(SessionAuthGuard)
  @Delete(':_id')
  async remove(@Param('_id') _id: string): Promise<IMessage> {
    return this.projectsService.remove(_id);
  }
}
