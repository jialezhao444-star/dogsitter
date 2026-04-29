import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsitterModule } from './dogsitter/dogsitter.module';
import { UserModule } from './user/user.module';
import { DogModule } from './dog/dog.module';
import { ServiceModule } from './service/service.module';
import { RequestModule } from './request/request.module';
import { ApplyModule } from './apply/apply.module';
import { PaymentModule } from './payment/payment.module';
import { ReviewsModule } from './reviews/reviews.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user/entities/user.entity';
import { Dogsitter } from './dogsitter/entities/dogsitter.entity';
import { Dog } from './dog/entities/dog.entity';
import { Service } from './service/entities/service.entity';
import { Request } from './request/entities/request.entity';
import { Apply } from './apply/entities/apply.entity';
import { Payment } from './payment/entities/payment.entity';
import { Review } from './reviews/entities/review.entity';



@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), 
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Dogsitter, Dog, Service,Request,Payment,Apply,Review],
      autoLoadModels: true,
      sync:{ alter: true },
    }),
    DogsitterModule, UserModule, DogModule, ServiceModule, RequestModule, ApplyModule, PaymentModule, ReviewsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

