import { Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private paymentModel: typeof Payment,
  ) {}

  async create(createPaymentDto: CreatePaymentDto) {
    return await this.paymentModel.create(
      createPaymentDto as Partial<Payment>,
    );
  }

  async findAll() {
    return await this.paymentModel.findAll();
  }

  async findOne(id: number) {
    return await this.paymentModel.findByPk(id);
  }

  async update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return await this.paymentModel.update(updatePaymentDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.paymentModel.destroy({
      where: { id: id },
    });
  }
}
