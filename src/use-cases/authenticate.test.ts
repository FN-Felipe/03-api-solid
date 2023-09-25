import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let userMemoryRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    userMemoryRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(userMemoryRepository)
  })
  
  it('should be able to authenticate', async () => {
    await userMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6)
    })

    const { user } = await sut.execute({
      email: 'johndoe@mail.com',
      password: '123456'
    })

    await expect(user.id).toEqual(expect.any(String))
  })

  it('should be able to authenticate with wrong email', async () => {
    await expect(() => sut.execute({
      email: 'johndoe@mail.com',
      password: '123456'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should be able to authenticate with wrong password', async () => {
    await userMemoryRepository.create({
      name: 'John Doe',
      email: 'johndoe@mail.com',
      password_hash: await hash('123456', 6)
    })

    await expect(() => sut.execute({
      email: 'johndoe@mail.com',
      password: '123123'
    })).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})