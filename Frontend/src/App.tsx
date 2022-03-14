import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from './components/Header'
import Footer from './components/Footer'
import TodoList from './components/TodoList'

export default function App(): React.ReactElement {
  return (
    <Container maxWidth="container.xl">
      <Header />
      <TodoList />
      <Footer />
    </Container>
  )
}
