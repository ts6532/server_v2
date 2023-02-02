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

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(SessionAuthGuard)
  @Post()
  async create(@Body() createProjectDto: CreateProjectDto) {
    return new ProjectDto(await this.projectsService.create(createProjectDto));
  }

  @UseGuards(SessionAuthGuard)
  @Get()
  async findAll() {
    const res = await this.projectsService.findAll();
    return res.map((el) => new ProjectDto(el));
  }

  @UseGuards(SessionAuthGuard)
  @Get(':_id')
  async findOne(@Param('_id') _id: string) {
    return new ProjectDto(await this.projectsService.findOne(_id));
  }

  @UseGuards(SessionAuthGuard)
  @Put()
  async update(@Body() updateProjectDto: UpdateProjectDto) {
    return new ProjectDto(await this.projectsService.update(updateProjectDto)) ;
  }

  @UseGuards(SessionAuthGuard)
  @Delete(':_id')
  async remove(@Param('_id') _id: string) {
    return this.projectsService.remove(_id);
  }
}
