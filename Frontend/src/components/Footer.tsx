import React from 'react'
import { Box, Center, Text, Link } from '@chakra-ui/react'

export default function Footer(): JSX.Element {
  return (
    <Box as="footer" width="full">
      <Center paddingY={16}>
        <Text>
          © 2022 Copyright <Link href="https://clearpoint.digital">clearpoint.digital</Link>
        </Text>
      </Center>
    </Box>
  )
}
