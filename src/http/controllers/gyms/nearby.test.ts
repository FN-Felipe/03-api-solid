import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms (e2e)', () => {
  beforeAll(async () => { await app.ready() })

  afterAll(async () => { await app.close() })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'JavaScript Gym',
      description: 'Some description',
      phone: '1199999999',
      latitude: -21.2588166,
      longitude: -48.317325,
    })

    await request(app.server).post('/gyms').set('Authorization', `Bearer ${token}`).send({
      title: 'TypeScript Gym',
      description: 'Some description',
      phone: '1199999999',
      latitude: -21.0314031,
      longitude: - 48.0346134,
    })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -21.2588166,
        longitude: -48.317325,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({ title: 'JavaScript Gym' })
    ])
  })
})