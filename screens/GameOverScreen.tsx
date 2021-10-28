import React from 'react'
import { View, Text, Button } from 'react-native'
import Card from '../components/Card'

interface PropTypes {
  userNumber: number
  guessRounds: number
  configureNewGameHandler: () => void
}

const GameOverScreen = (props: PropTypes) => {
  console.log(props.userNumber, 'user number')
  console.log(props.guessRounds, 'guess')

  return (
    <Card>
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
    </Card>
  )
}

export default GameOverScreen
