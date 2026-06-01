import { Request, Response } from 'express'
import { GetDashboardStatsUseCase } from './use-cases'

export class AdminController {
  constructor(private readonly getDashboardStats: GetDashboardStatsUseCase) {}

  async dashboard(req: Request, res: Response): Promise<void> {
    res.json(await this.getDashboardStats.execute())
  }
}
