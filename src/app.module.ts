import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ConversionModule } from './modules/conversion/conversion.module';

@Module({
  imports: [
    ConversionModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
