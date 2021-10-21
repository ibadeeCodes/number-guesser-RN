import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

// Theme
import { colors } from '../styles/theme'

const Header = ({ title }: PropTypes) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerHeading}>{title}</Text>
    </View>
  )
}

// Interface
interface PropTypes {
  title: string
}

// Styles
const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 65,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerHeading: {
    color: colors.black,
    fontSize: 18,
    textTransform: 'uppercase',
  },
})

export default Header
