import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka.interface';
import { AppModule } from './app.module';

const logger = new Logger('Main');

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'conversion-service',
          brokers: ['localhost:9092'],
          logLevel: logLevel.ERROR,
        },
      },
    },
  );

  app
    .listen()
    .then(() => logger.log('Kafka is running on Conversion Service'))
    .catch(() =>
      logger.error(
        'Error stabilishing connection with Kafka Cluster on Conversion Service',
      ),
    );
}
bootstrap();
