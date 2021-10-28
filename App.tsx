import React, { useState } from 'react'

// React Native
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

// Custom Components
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'
import GameOverScreen from './screens/GameOverScreen'

const App = () => {
  const [number, setNumber] = useState<number | null>()
  const [guessRounds, setGuessRounds] = useState<number | null>(0)

  const onSetNumberHandler = (value: number | null): void => {
    setNumber(value)
  }

  const onEndGameHandler = (guessNumber) => {
    setGuessRounds(guessNumber)
  }

  const configureNewGameHandler = () => {
    setNumber(null)
    setGuessRounds(null)
  }

  let content = <StartGameScreen onSetNumberHandler={onSetNumberHandler} />

  if (number && guessRounds <= 0) {
    content = (
      <GameScreen
        userNumber={number}
        onSetNumberHandler={onSetNumberHandler}
        onEndGameHandler={onEndGameHandler}
      />
    )
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        guessRounds={guessRounds}
        userNumber={number}
        configureNewGameHandler={configureNewGameHandler}
      />
    )
  }

  return (
    // Wrapper
    <View style={styles.container}>
      <StatusBar
        style='inverted'
        backgroundColor='#00000055'
        translucent={false}
      />
      <Header title='Number Guesser' />
      {content}
    </View>
  )
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
})

export default App
