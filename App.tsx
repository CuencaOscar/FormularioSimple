import React from 'react'
import { SafeAreaView, StatusBar, View } from 'react-native';
import Formulario from './src/screens/Formulario';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <Formulario />
    </SafeAreaView>
  )
}

export default App;