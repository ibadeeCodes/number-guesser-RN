import React from 'react'
import { View, Text, Button } from 'react-native'

interface PropTypes {
  userNumber: number
  guessRounds: number
  configureNewGameHandler: () => void
}

const GameOverScreen = (props: PropTypes) => {
  return (
    <View>
      <Text>Game over screen!</Text>
      <Text>User Number : {props.userNumber}</Text>
      <Text>Total guesses : {props.guessRounds}</Text>
      <Button
        title='New Game'
        onPress={() => {
          props.configureNewGameHandler()
        }}
      />
    </View>
  )
}

export default GameOverScreen
