import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import Sidebar from './sidebar'
import { describe, it, expect, vi } from 'vitest'
import '@testing-library/jest-dom/vitest'

describe('Sidebar', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })
  it('fetches and displays user data', async () => {
    const mockFetch = vi.fn()

    mockFetch.mockResolvedValueOnce({
      json: async () => ({
        firstName: 'Liam',
        LastName: 'john@Bennett.com',
        occupation: 'Software Engineer',
      }),
    })
    render(Sidebar as unknown as React.ReactNode)
  })
})
