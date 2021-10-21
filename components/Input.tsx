import React from 'react'
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  ViewStyle,
} from 'react-native'

const Input = (props: any) => {
  const { style } = props
  return <TextInput {...props} style={[styles.input, style]} />
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
})

export default Input
