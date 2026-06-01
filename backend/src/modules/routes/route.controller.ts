import { Request, Response } from 'express'
import { ListRoutesUseCase } from './use-cases/list-routes.usecase'
import { GetRouteUseCase } from './use-cases/get-route.usecase'

export class RouteController {
  constructor(
    private readonly listRoutes: ListRoutesUseCase,
    private readonly getRoute: GetRouteUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listRoutes.execute())
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.getRoute.execute(req.params.id as string))
  }
}
