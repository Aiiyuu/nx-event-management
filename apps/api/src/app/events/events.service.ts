import { Injectable, NotFoundException } from '@nestjs/common';
import { EventCategory } from '@prisma/client';
import { EventId } from './types/event-id.type';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EventsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async search(query: string, category?: EventCategory[], skip = 0, take = 10) {
    const where: unknown = {
      AND: [
        category?.length ? { category: { in: category } } : {},
        query
          ? {
              OR: [
                { title: { contains: query, mode: 'insensitive' } },
                { description: { contains: query, mode: 'insensitive' } },
                { location: { contains: query, mode: 'insensitive' } },
              ],
            }
          : {},
      ],
    };

    const total = await this.databaseService.event.count({ where });

    const data = await this.databaseService.event.findMany({
      where,
      skip,
      take,
      orderBy: { eventDate: 'asc' },
    });

    return { data, total };
  }

  async getAll(category?: EventCategory[], skip = 0, take = 10) {
    const where = category?.length ? { category: { in: category } } : {};

    const total = await this.databaseService.event.count({ where });

    const data = await this.databaseService.event.findMany({
      where,
      skip,
      take,
      orderBy: { eventDate: 'asc' },
    });

    return { data, total };
  }

  async getById(id: EventId) {
    const event = await this.databaseService.event.findUnique({
      where: { id },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const recommendations = await this.getSimilarEvents(id, 5);

    return {
      event,
      recommendations,
    };
  }

  async getSimilarEvents(id: EventId, limit = 5) {
    const event = await this.databaseService.event.findUnique({
      where: { id },
    });

    if (!event) throw new NotFoundException('Event not found');

    const candidates = await this.databaseService.event.findMany({
      where: {
        id: { not: id },
        OR: [{ category: event.category }, { location: event.location }],
      },
    });

    const DAY_IN_MS = 1000 * 60 * 60 * 24;

    const scoredEvents = candidates.map((candidate) => {
      let score = 0;

      if (candidate.category === event.category) {
        score += 3;
      }

      if (candidate.location === event.location) {
        score += 2;
      }

      const diffInDays =
        Math.abs(candidate.eventDate.getTime() - event.eventDate.getTime()) /
        DAY_IN_MS;

      if (diffInDays <= 7) {
        score += 1;
      }

      return { ...candidate, score };
    });

    return scoredEvents.sort((a, b) => b.score - a.score).slice(0, limit);
  }

  async create(createEventDto: CreateEventDto) {
    return await this.databaseService.event.create({ data: createEventDto });
  }

  async update(id: EventId, updateEventDto: UpdateEventDto) {
    return await this.databaseService.event.update({
      where: { id },
      data: updateEventDto,
    });
  }

  async remove(id: EventId) {
    return this.databaseService.event.delete({ where: { id } });
  }
}