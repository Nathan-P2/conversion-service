import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ConversionService {
  private readonly logger = new Logger(ConversionService.name);

  execute(conversion: any) {
    this.logger.log(`Data: ${JSON.stringify(conversion.value)}`);
  }
}
