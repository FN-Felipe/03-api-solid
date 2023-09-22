import { Gym } from '@prisma/client'
import { GymsRepositoty } from '@/repositories/gyms_repository'

interface FetchNearbyUseCaseRequest {
  userLatitude: number
  userLongitude: number
}

interface FetchNearbyUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyUseCase {
  constructor(private gymsRepository: GymsRepositoty) { }

  async execute({ userLatitude, userLongitude }: FetchNearbyUseCaseRequest): Promise<FetchNearbyUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude})
    return { gyms }
  }
}