import { BadRequestException, Injectable } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';

@Injectable()
export class AppValidationPipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (validationErrors) => {
        const errors: Record<string, string> = {};

        validationErrors.forEach((error) => {
          if (error.constraints) {
            errors[error.property] = Object.values(error.constraints)[0];
          }

          if (error.children?.length) {
            error.children.forEach((child) => {
              if (child.constraints) {
                errors[`${error.property}.${child.property}`] = Object.values(
                  child.constraints,
                )[0];
              }
            });
          }
        });

        return new BadRequestException({ errors });
      },
    });
  }
}
