import { CheckIn } from '@prisma/client';
import { CheckInsRepository } from '@/repositories/check-in-repository';
import { ResourceNotFoundError } from './errors/resource-not-found-error';
import dayjs from 'dayjs';

interface ValidateCheckInsUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInsUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) { }

  async execute({ checkInId }: ValidateCheckInsUseCaseRequest): Promise<ValidateCheckInsUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId)
    if (!checkIn) throw new ResourceNotFoundError()

    const distanceInMinutesFromCheckOnCreation = dayjs(new Date()).diff(checkIn.created_at, 'minutes')
    if (distanceInMinutesFromCheckOnCreation > 20) throw new Error()

    checkIn.validated_at = new Date()

    await this.checkInsRepository.save(checkIn)

    return { checkIn }
  }
}