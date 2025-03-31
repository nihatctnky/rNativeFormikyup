import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Add } from 'iconsax-react-native'
import AppColors from '../../theme/color'

const FloatActionButton = props => {
  return (
   <TouchableOpacity {...props}style= {styles.container}>
    <Add size="32" color="#fff"/>
   </TouchableOpacity>
  )
}

export default FloatActionButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: AppColors.ONGOING,
        width: 70,
        height:70,
        borderRadius: 35,
        justifyContent: "center",
        alignItems:"center",
        position: "absolute",
        bottom: 40,
        right: 20
    }
})