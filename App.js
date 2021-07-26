import React from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import Main from './src/main'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
FontAwesome.loadFont();

export default App = () => {
  return (
    <SafeAreaView>
      <Main/>
    </SafeAreaView>
  )
  
}
