import { Gym } from '@prisma/client'
import { GymsRepositoty } from '@/repositories/gyms_repository'

interface CreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: GymsRepositoty) { }

  async execute({ description, latitude, longitude, phone, title }: CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({ description, latitude, longitude, phone, title })

    return { gym }
  }
}