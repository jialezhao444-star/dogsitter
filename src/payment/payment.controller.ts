import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create')
  async create(@Body() createPaymentDto: CreatePaymentDto) {
    const createPayment = await this.paymentService.create(createPaymentDto);
    if (createPayment == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createPayment,
    };
  }

  @Get()
  findAll() {
    return this.paymentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findPayment = await this.paymentService.findOne(+id);
    if (findPayment == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findPayment;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updatePaymentDto: UpdatePaymentDto) {
      const [updatePayment] = await this.paymentService.update(
        +id,
        updatePaymentDto,
      );
    console.log(updatePayment);
    if (updatePayment === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyPayment = await this.paymentService.remove(+id);
    console.log(destroyPayment);
    if (destroyPayment == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
