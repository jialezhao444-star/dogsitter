import { PartialType } from '@nestjs/mapped-types';
import { CreateFullRequestDto } from './create-full-request.dto';

export class UpdateRequestDto extends PartialType(CreateFullRequestDto) {}
