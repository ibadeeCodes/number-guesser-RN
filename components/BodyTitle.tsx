import React from 'react'
import { Text } from 'react-native'
import DefaultStyles from '../constants/default-styles'

const BodyTitle = (props) => (
  <Text style={[DefaultStyles.title, props.style]}>{props.children}</Text>
)

export default BodyTitle
