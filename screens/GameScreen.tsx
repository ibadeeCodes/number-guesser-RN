import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native'
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

const renderListItem = (listLength: any, itemData: any) => (
  <View style={styles.listItem}>
    <Text># {listLength - itemData.index}</Text>
    <Text>{itemData.item}</Text>
  </View>
)

const GameScreen = (props: PropTypes) => {
  let initialGuess = generateNumberBetween(1, 100, props.userNumber)

  const [guessNumber, setGuessNumber] = useState(initialGuess)

  const [rounds, setRounds] = useState([String(initialGuess)])

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
        currentLow.current = guessNumber + 1
      }

      const nextNumber = generateNumberBetween(
        currentLow.current,
        currentHigh.current,
        guessNumber
      )

      setGuessNumber(nextNumber)
      setRounds((prevRound) => [String(nextNumber), ...prevRound])
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
      props.onEndGameHandler(rounds.length)

      return
    }
  }, [props.userNumber, guessNumber])

  return (
    <View style={styles.screen}>
      <Text>Opponents Guess</Text>
      <NumberContainer>{guessNumber}</NumberContainer>
      <Card style={styles.card}>
        <MyButton onPress={onNextGuessHandler.bind(this, 'lower')}>
          <AntDesign name='minuscircleo' size={25} color='white' />
        </MyButton>
        <MyButton onPress={onNextGuessHandler.bind(this, 'upper')}>
          <AntDesign name='pluscircleo' size={25} color='white' />
        </MyButton>
      </Card>
      {/* <View style={{ marginTop: 15 }}>
        <Button
          title='Restart Game'
          onPress={onRestart}
          color={colors.warning}
        />
      </View> */}
      <View style={styles.listContainer}>
        <Text style={{ marginVertical: 10 }}>Past Guesses</Text>
        {/* <ScrollView>
          {rounds.map((round, idx) => renderListItem(round, idx))}
        </ScrollView> */}
        <FlatList
          keyExtractor={(item) => item}
          data={rounds}
          renderItem={renderListItem.bind(this, rounds.length)}
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
  listContainer: {
    width: '80%',
    flex: 1,
  },
  listItem: {
    borderColor: '#ccc',
    borderWidth: 2,
    marginVertical: 6,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
})

export default GameScreen
