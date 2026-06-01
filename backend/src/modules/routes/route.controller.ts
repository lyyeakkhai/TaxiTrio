import { Request, Response } from 'express'
import { ListRoutesUseCase, GetRouteUseCase, CreateRouteUseCase, UpdateRouteUseCase, DeleteRouteUseCase, ToggleRouteUseCase } from './use-cases'
import { CreateRouteDto, UpdateRouteDto } from './route.schema'

export class RouteController {
  constructor(
    private readonly listRoutes: ListRoutesUseCase,
    private readonly getRoute: GetRouteUseCase,
    private readonly createRoute: CreateRouteUseCase,
    private readonly updateRoute: UpdateRouteUseCase,
    private readonly deleteRoute: DeleteRouteUseCase,
    private readonly toggleRoute: ToggleRouteUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    res.json(await this.listRoutes.execute())
  }

  async get(req: Request, res: Response): Promise<void> {
    res.json(await this.getRoute.execute(req.params.id as string))
  }

  async adminCreate(req: Request, res: Response): Promise<void> {
    const dto = req.body as CreateRouteDto
    const imageBuffer = req.file?.buffer
    res.status(201).json(await this.createRoute.execute(dto, imageBuffer))
  }

  async adminUpdate(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    const dto = req.body as UpdateRouteDto
    const imageBuffer = req.file?.buffer
    res.json(await this.updateRoute.execute(id, dto, imageBuffer))
  }

  async adminDelete(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    await this.deleteRoute.execute(id)
    res.status(204).send()
  }

  async adminToggle(req: Request, res: Response): Promise<void> {
    const id = req.params.id as string
    res.json(await this.toggleRoute.execute(id))
  }
}
