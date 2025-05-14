import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

if (expect && expect.extend && expect.extend !== null) expect.extend(matchers)

afterEach(() => {
  cleanup()
})
