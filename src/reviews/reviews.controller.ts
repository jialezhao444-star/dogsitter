import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewService: ReviewsService) {}

  @Post('/create')
  async create(@Body() createReviewDto: CreateReviewDto) {
    const createReview = await this.reviewService.create(createReviewDto);
    if (createReview == null) {
      throw new Error('Can not Create Data!!!')
    }
    return {
      message: 'Create Data Complete',
      data: createReview,
    };
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const findReview = await this.reviewService.findOne(+id);
    if (findReview == null) {
      throw new NotFoundException('Not Found Dtat!!!');
    }
    return findReview;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateReviewDto: UpdateReviewDto) {
      const [updateReview] = await this.reviewService.update(
        +id,
        updateReviewDto,
      );
    console.log(updateReview);
    if (updateReview === 0) {
      throw new NotFoundException('Not Found Data to Update!!!')
    }
    return {message: 'Update Data Complete'};
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const destroyReview = await this.reviewService.remove(+id);
    console.log(destroyReview);
    if (destroyReview == 0) {
      throw new NotFoundException('Not Found Data to Remove!!!');
    }
    return { message: 'Remove Data Complete' };
  }
}
