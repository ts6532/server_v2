import { IsMongoId } from 'class-validator';

export class ParamsWithId {
  @IsMongoId()
  id: string;
}
