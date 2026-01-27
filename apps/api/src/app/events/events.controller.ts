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
import { EventsService } from './events.service';
import type { EventId } from './types/event-id.type';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventCategory } from '@prisma/client';
import { ParseEnumArrayPipe } from '../../common/pipes/parse-enum-array.pipe';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('category', new ParseEnumArrayPipe(EventCategory))
    category?: EventCategory[],
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    return this.eventsService.search(query, category, skip, pageSize);
  }

  @Get()
  getAll(
    @Query('category', new ParseEnumArrayPipe(EventCategory))
    category?: EventCategory[],
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    const pageNumber = parseInt(page, 10);
    const pageSize = parseInt(limit, 10);
    const skip = (pageNumber - 1) * pageSize;

    return this.eventsService.getAll(category, skip, pageSize);
  }

  @Get(':id')
  getById(@Param('id') id: EventId) {
    return this.eventsService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: EventId, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: EventId) {
    return this.eventsService.remove(id);
  }
}
