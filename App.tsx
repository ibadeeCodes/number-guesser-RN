import React, { useState } from 'react'

// React Native
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

// Custom Components
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'

const App = () => {
  const [number, setNumber] = useState<number | null>()

  const onSetNumberHandler = (value: number | null): void => {
    setNumber(value)
  }

  let content = <StartGameScreen onSetNumberHandler={onSetNumberHandler} />

  if (number) {
    content = (
      <GameScreen userNumber={number} onSetNumberHandler={onSetNumberHandler} />
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
