
import { LocalImage } from '@components/upload/local-image.schema';
import { OmitType, PartialType } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class LocalImageDto extends LocalImage {}

