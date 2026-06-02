import { Request, Response } from 'express'
import { CreateReviewUseCase, ListAdminReviewsUseCase, DeleteReviewUseCase } from './use-cases'

export class ReviewController {
  constructor(
    private readonly createReview: CreateReviewUseCase,
    private readonly listReviews: ListAdminReviewsUseCase,
    private readonly deleteReview: DeleteReviewUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const review = await this.createReview.execute(req.body, req.user!.id)
    res.status(201).json(review)
  }

  async adminList(req: Request, res: Response): Promise<void> {
    const reviews = await this.listReviews.execute()
    res.json(reviews)
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    await this.deleteReview.execute(req.params.id as string)
    res.status(204).send()
  }
}
