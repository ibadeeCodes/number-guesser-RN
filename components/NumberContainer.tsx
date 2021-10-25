import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { colors } from '../styles/theme'

interface PropTypes {
  children: number
}

const NumberContainer = (props: PropTypes) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{props.children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    borderColor: colors.blackShadow,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})

export default NumberContainer
