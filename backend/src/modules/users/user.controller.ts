import { Request, Response } from 'express'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { GetMeUseCase } from './use-cases/get-me.usecase'

export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getMe: GetMeUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const user = await this.createUser.execute({ ...req.body, clerkId: req.user!.clerkId })
    res.status(201).json(user)
  }

  async me(req: Request, res: Response): Promise<void> {
    const user = await this.getMe.execute(req.user!.clerkId)
    res.json(user)
  }
}
