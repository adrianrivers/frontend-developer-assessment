import React from 'react'
import { Box, Text, keyframes } from '@chakra-ui/react'

interface TodoDescriptionProps {
  description: string
  isCompleted: boolean
}

export default function TodoDescription({ description, isCompleted }: TodoDescriptionProps) {
  const strikethrough = keyframes`
        from { width: 0; }
        to { width: calc(100% + 1em); }
    `

  return !isCompleted ? (
    <Text>{description}</Text>
  ) : (
    <Text>
      <Box
        as="span"
        position="relative"
        _after={{
          content: '""',
          background: 'red',
          position: 'absolute',
          width: 'calc(100% + 1em)',
          height: '2px',
          left: '-0.5em',
          top: '50%',
          animation: `${strikethrough} 0.2s linear`,
        }}
      >
        {description}
      </Box>
    </Text>
  )
}
