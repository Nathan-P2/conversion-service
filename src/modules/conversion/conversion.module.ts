import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { logLevel } from 'kafkajs';
import { ConversionController } from './conversion.controller';
import { ConversionService } from './conversion.service';

@Module({
  controllers: [ConversionController],
  providers: [ConversionService],
  imports: [
    ClientsModule.register([
      {
        name: 'CONVERSION_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'conversion-service',
            brokers: ['localhost:9092'],
            logLevel: logLevel.ERROR,
          },
        },
      },
    ]),
  ],
})
export class ConversionModule {}
