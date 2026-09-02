import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

export default function TelaPrincipal({navigation}:any) {
  return (
    <View style={styles.container}>
        <Text style={styles.titulo}>
          Tela Principal | Escolha a Ação
        </Text>
        <View style={styles.botoes}>
            <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('TelaTreinar')}
          >
            <Text style={styles.textoBotao}>Tela Treinar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => navigation.navigate('TelaTreinar')}
          >
            <Text style={styles.textoBotao}>Tela Lista Pokemons</Text>
          </TouchableOpacity>
        </View>
     </View>
  )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
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
})