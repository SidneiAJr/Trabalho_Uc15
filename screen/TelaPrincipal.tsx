import { StyleSheet, Text, View,TouchableOpacity,ImageBackground } from 'react-native'
import React from 'react'

export default function TelaPrincipal({navigation}:any) {
  return (
    <ImageBackground
      source={{ uri: 'https://i.pinimg.com/originals/1a/d0/11/1ad011529ccd9c2c515a609d8586bab9.gif' }}
      style={styles.background}
    >
    <View style={styles.container}>
      
        <Text style={styles.titulo}>
          Tela Principal | O que quer fazer?
        </Text>
        <View style={styles.botoes}>
            <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('TelaTreinar')}
          >
            <Text style={styles.textoBotao}>Treinar Pokemon</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('TelaLista')}
          >
            <Text style={styles.textoBotao}>Ver todos Pokemons</Text>
          </TouchableOpacity>
        </View>
     </View>
     </ImageBackground>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    justifyContent: 'center'
  },

  titulo: {
    fontSize: 30,
    fontWeight: '900',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },

  botoes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  botao: {
    width: '45%',
    height: 90,
    borderRadius: 20,
    backgroundColor: 'black',
    margin: 5,

    alignItems: 'center',
    justifyContent: 'center',
  },

  textoBotao: {
    color: 'white',
    fontSize: 15,
    fontWeight: '900',
    textAlign: 'center',
  },
  background:{
    flex: 1
  }
})