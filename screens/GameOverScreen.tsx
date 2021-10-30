import React from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import BodyTitle from '../components/BodyTitle'
import Card from '../components/Card'
import { colors } from '../styles/theme'

interface PropTypes {
  userNumber: number
  guessRounds: number
  configureNewGameHandler: () => void
}

const GameOverScreen = (props: PropTypes) => {
  return (
    <View style={styles.screen}>
      <View>
        <BodyTitle>Game Over!</BodyTitle>
      </View>
      <View style={styles.imageContainer}>
        <Image
          fadeDuration={1000}
          style={styles.image}
          // source={require('../assets/success.png')}
          source={{
            uri: 'https://bit.ly/dan-abramov',
          }}
          resizeMode='stretch'
        />
      </View>

      <View>
        <Text>
          User Number : <Text>{props.userNumber}</Text>
        </Text>
        <Text>
          Total guesses : <Text>{props.guessRounds}</Text>
        </Text>
      </View>
      <View style={styles.newGameBtn}>
        <Button
          title='New Game'
          onPress={() => {
            props.configureNewGameHandler()
          }}
          color={colors.primary}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 200,
    borderWidth: 3,
    borderColor: colors.primary,
    overflow: 'hidden',
    marginVertical: 30,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  newGameBtn: {
    marginTop: 20,
  },
})

export default GameOverScreen
