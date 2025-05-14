import type React from "react"

import styled from "styled-components"

const Container = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 250px;
  
  @media (max-width: 768px) {
    margin-left: 0;
    padding: 1rem;
  }
`

export default function Content({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>
}
