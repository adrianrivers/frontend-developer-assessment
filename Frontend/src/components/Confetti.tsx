import React from 'react'
import theme from '../theme'
import { default as ReactConfetti } from 'react-confetti'

export default function Confetti(): React.ReactElement | null {
  const {
    colors: {
      brand: { vividOrange, vividPurple, vividGreen },
    },
  } = theme

  const confettiColors = [vividOrange, vividPurple, vividGreen]

  return <ReactConfetti colors={confettiColors} recycle={false} />
}
