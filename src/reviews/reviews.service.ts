import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review)
    private reviewModel: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto) {
    return await this.reviewModel.create(
      createReviewDto as Partial<Review>,
    );
  }

  async findAll() {
    return await this.reviewModel.findAll();
  }

  async findOne(id: number) {
    return await this.reviewModel.findByPk(id);
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.reviewModel.update(updateReviewDto, {
      where: { id: id },
    });
  }

  async remove(id: number) {
    return await this.reviewModel.destroy({
      where: { id: id },
    });
  }
}
