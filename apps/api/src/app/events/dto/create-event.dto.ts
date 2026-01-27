import {
  EventCategory,
  CreateEventDto as CreateEventDtoType,
} from '@org/models';

import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEventDto implements CreateEventDtoType {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(80)
  title!: string;

  @IsString()
  @IsNotEmpty()
  location!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsDateString()
  eventDate!: string;

  @IsEnum(EventCategory)
  category!: EventCategory;
}
