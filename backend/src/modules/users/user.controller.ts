import { Request, Response } from 'express'
import { CreateUserUseCase } from './use-cases/create-user.usecase'
import { GetMeUseCase } from './use-cases/get-me.usecase'
import { ListUsersUseCase } from './use-cases/list-users.usecase'
import { GetUserUseCase } from './use-cases/get-user.usecase'

export class UserController {
  constructor(
    private readonly createUser: CreateUserUseCase,
    private readonly getMe: GetMeUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    const user = await this.createUser.execute({ ...req.body, clerkId: req.user!.clerkId })
    res.status(201).json(user)
  }

  async me(req: Request, res: Response): Promise<void> {
    const user = await this.getMe.execute(req.user!.clerkId)
    res.json(user)
  }

  async listAll(req: Request, res: Response): Promise<void> {
    const role = typeof req.query.role === 'string' ? req.query.role : undefined
    res.json(await this.listUsers.execute(role))
  }

  async getOne(req: Request, res: Response): Promise<void> {
    res.json(await this.getUser.execute(req.params.id))
  }
}
