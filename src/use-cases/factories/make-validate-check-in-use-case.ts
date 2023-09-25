import { PrismaCheckInsRepository } from '@/repositories/prisma/pisma-check-ins-repository'
import { ValidateCheckInsUseCase } from '../validate-check-in'

export function makeValidateCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const useCase = new ValidateCheckInsUseCase(checkInsRepository)

  return useCase
}