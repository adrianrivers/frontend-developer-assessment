import React from 'react'
import { Container, Box, Image, Center } from '@chakra-ui/react'

export default function Header(): JSX.Element {
  return (
    <Container as="header">
      <Box height={16} marginY={16}>
        <Center>
          <Image src="/clearPointLogo.png" width="200px" />
        </Center>
      </Box>
    </Container>
  )
}
