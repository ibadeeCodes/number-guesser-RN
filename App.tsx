import React, { useState } from 'react'

// React Native
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'

// Custom Components
import Header from './components/Header'
import StartGameScreen from './screens/StartGameScreen'
import GameScreen from './screens/GameScreen'

const App = () => {
  const [number, setNumber] = useState<number>()

  const onSetNumberHandler = (number: number): void => {
    setNumber(number!)
    // console.log('hi')
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
      <StartGameScreen onSetNumberHandler={onSetNumberHandler} />
      {number && <GameScreen />}
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
