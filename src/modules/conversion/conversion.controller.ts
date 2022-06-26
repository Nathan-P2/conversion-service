import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, MessagePattern, Payload } from '@nestjs/microservices';
import { Producer } from '@nestjs/microservices/external/kafka.interface';
import { ConversionService } from './conversion.service';

@Controller()
export class ConversionController implements OnModuleInit {
  private kafkaProducer: Producer;

  constructor(
    private readonly conversionService: ConversionService,
    @Inject('CONVERSION_SERVICE') private kafka: ClientKafka,
  ) {}

  async onModuleInit() {
    this.kafkaProducer = await this.kafka.connect();
  }

  @MessagePattern('conversion-topic')
  handleConversion(@Payload() data: any) {
    this.conversionService.execute(data);

    this.kafkaProducer.send({
      topic: 'performance-topic',
      messages: [
        {
          value: JSON.stringify(data.value),
        },
      ],
    });
  }

  @MessagePattern('performance-topic')
  handlePerformance(@Payload() data: any) {
    this.conversionService.execute(data);
  }
}
