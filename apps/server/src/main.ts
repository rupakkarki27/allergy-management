import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // getting the reference to the config service from the app
  const configService = app.get<ConfigService<IConfig>>(ConfigService);

  // set API global prefix to /api
  app.setGlobalPrefix(configService.get('GLOBAL_PREFIX'));

  /**
   * custom validation pipe object that sends the validation message in the following format for each field
   * {field: "password", message: "Password length must be 8 characters"}[]
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(errors) {
        const errorObject = errors.map((error) => {
          const field = error.property;
          const keys = Object.keys(error.constraints);
          const message = error.constraints[keys[0]];

          return { field, message };
        });
        return new BadRequestException(errorObject);
      },
    }),
  );

  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Allergy Management System')
    .setVersion('1.0.0')
    .setExternalDoc('Postman Collection', '/docs-json')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(configService.get('SWAGGER_ROUTE'), app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  await app.listen(configService.get('PORT'));
}

bootstrap();
