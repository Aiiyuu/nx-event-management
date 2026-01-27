import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseEnumArrayPipe<
  T extends Record<string, string>,
> implements PipeTransform {
  constructor(private readonly enumType: T) {}

  transform(value: string | string[]): T[keyof T][] | undefined {
    if (!value) return undefined;

    const values = Array.isArray(value) ? value : value.split(',');

    const invalidValues = values.filter(
      (v) => !Object.values(this.enumType).includes(v),
    );

    if (invalidValues.length) {
      throw new BadRequestException(
        `Validation failed. Invalid enum value(s): ${invalidValues.join(', ')}`,
      );
    }

    return values as T[keyof T][];
  }
}
