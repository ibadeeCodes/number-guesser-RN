import React from 'react'
import { StyleProp, StyleSheet, View } from 'react-native'

// Theme
import { colors } from '../styles/theme'

// Interfaces
interface PropTypes {
  style?: StyleProp<any>
  children: JSX.Element | JSX.Element[]
}

const Card = (props: PropTypes) => {
  const { style, children } = props
  return (
    <View {...props} style={[styles.card, style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    shadowColor: colors.blackShadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    paddingVertical: 20,
    paddingHorizontal: 20,
    elevation: 5,
    borderRadius: 8,
  },
})
export default Card
