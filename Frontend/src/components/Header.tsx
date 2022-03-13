import React from 'react'
import { Container, Box, Image, Center, Link } from '@chakra-ui/react'

export default function Header(): JSX.Element {
  return (
    <Container as="header">
      <Box height={16} marginY={16}>
        <Center>
          <Link href="https://clearpoint.digital" target="_blank">
            <Image src="/clearPointLogo.png" width="200px" />
          </Link>
        </Center>
      </Box>
    </Container>
  )
}
