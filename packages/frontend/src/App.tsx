import React from 'react'
import { Container, ChakraProvider } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from './components/TodoList'
import { SWRConfig } from 'swr'
import theme from './theme'

export default function App(): React.ReactElement {
  return (
    <SWRConfig>
      <ChakraProvider theme={theme}>
        <Container maxWidth="container.xl">
          <Header />
          <TodoList />
          <Footer />
        </Container>
      </ChakraProvider>
    </SWRConfig>
  )
}
