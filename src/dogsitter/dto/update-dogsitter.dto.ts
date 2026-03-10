import { PartialType } from '@nestjs/mapped-types';
import { CreateDogsitterDto } from './create-dogsitter.dto';

export class UpdateDogsitterDto extends PartialType(CreateDogsitterDto) {}
