import React, { SetStateAction } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { colors } from '../styles/theme'

// Custom Components
import Card from './Card'

// Interfaces
interface PropTypes {
  number: SetStateAction<number>
  onStartGameHandler: () => void
}

const OutputResult = ({ number, onStartGameHandler }: PropTypes) => {
  return (
    <Card style={styles.resultContainer}>
      <Text>You've selected</Text>
      <View style={styles.numberContainer}>
        <Text style={styles.numberText}>{number}</Text>
      </View>
      <Button
        title='Start Game'
        onPress={() => {
          // console.log('output clicker')
          onStartGameHandler()
        }}
      />
    </Card>
  )
}

const styles = StyleSheet.create({
  resultContainer: {
    alignItems: 'center',
    maxWidth: '50%',
    width: 200,
  },
  numberContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    marginVertical: 15,
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  numberText: {
    fontSize: 18,
  },
})

export default OutputResult
