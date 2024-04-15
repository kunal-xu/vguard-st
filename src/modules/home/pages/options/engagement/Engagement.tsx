import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import colors from '../../../../../../colors'

const Engagement = () => {
  return (
    <View style={styles.mainWrapper}>
      <Image style={{ width: "80%", height: "80%" }}
        resizeMode="contain" source={require('../../../../../assets/images/vguard_coming_soon-removebg-preview.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrapper: {
    backgroundColor: colors.white,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%'
  }
})

export default Engagement