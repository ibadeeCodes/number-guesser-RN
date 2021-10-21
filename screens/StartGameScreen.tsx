import React, { FC, SetStateAction, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native'

// Custom Components
import Card from '../components/Card'
import Input from '../components/Input'
import OutputResult from '../components/OutputResult'

// Theme
import { colors } from '../styles/theme'

interface PropTypes {
  onSetNumberHandler: (number: number) => void
}

const StartGameScreen: React.FC<PropTypes> = ({ onSetNumberHandler }) => {
  // State
  const [inputValue, setInputValue] = useState('')
  const [selectedNumber, setSelectedNumber] =
    useState<React.SetStateAction<number>>()
  const [isConfirmed, setIsConfirmed] = useState(false)

  // Events Handling
  const onInputChange = (value: string) => {
    setInputValue(value.replace(/[^0-9]/g, ''))
  }

  // Form Handling
  const resetForm = () => {
    setInputValue('')
    onSetNumberHandler()
  }

  const submitForm = () => {
    const choosedNumber = parseInt(inputValue)
    if (isNaN(choosedNumber) || choosedNumber < 1 || choosedNumber > 99) {
      Alert.alert(
        'Invalid Number!',
        'Number has to be a number between 1 and 99.',
        [{ text: 'Okay', style: 'destructive', onPress: resetForm }]
      )

      return
    }

    Keyboard.dismiss()
    setIsConfirmed(true)
    setSelectedNumber(parseInt(inputValue))
    onSetNumberHandler(parseInt(inputValue))
    setInputValue('')
  }

  let resultOutput

  if (isConfirmed) {
    resultOutput = <OutputResult number={selectedNumber!} />
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <Text style={styles.screenTitle}>Let's Play The Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Enter a Number!</Text>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitialize='none'
            autoCorrect={false}
            keyboardType='numeric'
            maxLength={2}
            onChangeText={onInputChange}
            value={inputValue}
          />
          <View style={styles.formButtonContainer}>
            <View style={styles.formButton}>
              <Button
                title='Reset'
                onPress={resetForm}
                color={colors.secondary}
              />
            </View>
            <View style={styles.formButton}>
              <Button
                title='Confirm'
                onPress={submitForm}
                color={colors.primary}
              />
            </View>
          </View>
        </Card>
        {resultOutput}
      </View>
    </TouchableWithoutFeedback>
  )
}

// Styles
const styles = StyleSheet.create({
  // Start Game Screen Styles
  screen: {
    flex: 1,
    paddingVertical: 20,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 24,
  },
  inputContainer: {
    maxWidth: '80%',
    width: 350,
    alignItems: 'center',
  },
  input: {
    textAlign: 'center',
    width: 50,
  },
  formButtonContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formButton: {
    width: 100,
  },
})

export default StartGameScreen
