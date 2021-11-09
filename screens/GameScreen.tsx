import React, { useState, useRef, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Alert } from 'react-native'
import { Ionicons, AntDesign } from '@expo/vector-icons'
import Card from '../components/Card'
import NumberContainer from '../components/NumberContainer'
import { colors } from '../styles/theme'
import MyButton from '../components/MyButton'

interface PropTypes {
  userNumber: number
  onSetNumberHandler: (value: number | null) => void
  onEndGameHandler: (value: number | null) => void
}

// Number generator function:
const generateNumberBetween = (min: number, max: number, exclude: number) => {
  min = Math.ceil(min)
  max = Math.floor(max)

  const randomNum = Math.floor(Math.random() * (max - min) + min)

  if (randomNum == exclude) {
    return generateNumberBetween(min, max, exclude)
  } else {
    return randomNum
  }
}

const GameScreen = (props: PropTypes) => {
  const [guessNumber, setGuessNumber] = useState(
    generateNumberBetween(1, 100, props.userNumber)
  )

  const [rounds, setRounds] = useState(0)

  const currentLow = useRef(1)
  const currentHigh = useRef(100)

  const onNextGuessHandler = (direction) => {
    // Check if user lies!
    if (
      (direction == 'lower' && guessNumber < props.userNumber) ||
      (direction == 'upper' && guessNumber > props.userNumber)
    ) {
      Alert.alert('Dont lie', 'You know it well...', [
        {
          text: 'Sorry',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            props.onSetNumberHandler(props.userNumber)
          },
        },
      ])

      return
    } else {
      if (direction === 'lower') {
        currentHigh.current = guessNumber
      } else {
        currentLow.current = guessNumber
      }

      const nextNumber = generateNumberBetween(
        currentLow.current,
        currentHigh.current,
        guessNumber
      )

      setGuessNumber(nextNumber)
      setRounds((prevRound) => prevRound + 1)
    }
  }

  const onRestart = () =>
    Alert.alert('Restart Game', 'Are you sure', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          props.onSetNumberHandler(null)
        },
      },
    ])

  useEffect(() => {
    if (props.userNumber == guessNumber) {
      Alert.alert('Congrats!', 'Computer guessed.', [
        {
          text: 'OK',
          onPress: () => {},
        },
      ])

      setGuessNumber(null)
      props.onEndGameHandler(rounds)

      return
    }
  }, [props.userNumber, guessNumber])

  return (
    <View style={styles.screen}>
      <Text>Opponents guess</Text>
      <NumberContainer>{guessNumber}</NumberContainer>
      <Card style={styles.card}>
        <MyButton onPress={onNextGuessHandler.bind(this, 'lower')}>
          <AntDesign name='minuscircleo' size={25} color='white' />
        </MyButton>
        <MyButton onPress={onNextGuessHandler.bind(this, 'upper')}>
          <AntDesign name='pluscircleo' size={25} color='white' />
        </MyButton>
      </Card>
      <View style={{ marginTop: 15 }}>
        <Button
          title='Restart Game'
          onPress={onRestart}
          color={colors.warning}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    width: 300,
    maxWidth: '80%',
    marginTop: 10,
    justifyContent: 'space-around',
  },
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
})

export default GameScreen
