import { LocalImageDocument,LocalImage } from '@components/upload/local-image.schema';
import { EntityRepository } from '@database/entity.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';


export class LocalImageRepository extends EntityRepository<LocalImageDocument> {
  constructor(
    @InjectModel(LocalImage.name) localImageModel: Model<LocalImageDocument>,
  ) {
    super(localImageModel);
  }
}
