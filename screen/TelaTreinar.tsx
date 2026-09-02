import React, { useState, useEffect } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { StyleSheet,View } from 'react-native'
import axios from 'axios'

export default function TelaTreinar() {
  const [alimentar,setAlimentar]=useState(0)
  const [brincar,setBrincar]=useState(0)
  const [limpar,setLimpar]=useState(0)
  const [dormir,setDormir]=useState(100)
  const [pokemons, setpokemons] = useState([])
  const [carregando,setcarregando]=useState(true)
  const [busca,setbusca]=useState('')
  const [pokemonSorteado, setPokemonSorteado] = useState()
  const filtrados = pokemons.filter((item: any) =>item.name.includes(busca.toLowerCase())
)

const getId = (url) => {
    const partes = url.split('/')
    const id = partes[partes.length - 2] // Pega o número antes da última barra
    return id
  }

    const acaoAlimentar = () => {
    setAlimentar(alimentar + 10)
    setDormir(Math.max(0, dormir - 10)) // Reduz sono, mas não deixa abaixo de 0
    console.log(`Pokemon foi alimentado! 🍖 (Comida: ${alimentar + 10}, Sono: ${dormir - 10})`)
  }

  // FUNÇÃO BRINCAR - reduz sono em 15
  const acaoBrincar = () => {
    setBrincar(brincar + 10)
    setDormir(Math.max(0, dormir - 15)) // Brincar gasta mais sono
    console.log(`Pokemon brincou! 🎾 (Brincar: ${brincar + 10}, Sono: ${dormir - 15})`)
  }

  // FUNÇÃO LIMPAR - reduz sono em 5
  const acaoLimpar = () => {
    setLimpar(limpar + 10)
    setDormir(Math.max(0, dormir - 5))
    console.log(`Pokemon foi limpo! 🧹 (Limpeza: ${limpar + 10}, Sono: ${dormir - 5})`)
  }

  // FUNÇÃO DORMIR - aumenta sono em 100
  const acaoDormir = () => {
    setDormir(Math.min(100, dormir + 100)) // Não passa de 100
    console.log(`Pokemon dormiu! 😴 (Sono: ${Math.min(100, dormir + 100)})`)
  }

const acaoSortear = () => {
  if (pokemons.length > 0) {
    const indiceAleatorio = Math.floor(Math.random() * pokemons.length)
    setPokemonSorteado(pokemons[indiceAleatorio])
    console.log(`Pokémon sorteado: ${pokemons[indiceAleatorio].name}`)
  } else {
    console.log('Não há pokémons para sortear')
  }
}

  useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=5000')
        .then(resposta=>{
           setpokemons(resposta.data.results)
            setcarregando(false)
             const indice = Math.floor(Math.random() * resposta.data.results.length)
        setPokemonSorteado(resposta.data.results[indice])
        })
        
},[])

  
  return (
    <View style={styles.container}>
     <Card style={styles.card}>
    <Card.Actions>
    <Button onPress={acaoSortear}>🎲 Sortear Pokémon</Button>
    </Card.Actions>
    <Card.Cover 
          style={styles.img} 
          source={{ 
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSorteado ? getId(pokemonSorteado.url) : '1'}.png` 
          }} 
        />
    <Card.Actions>
      <Button onPress={acaoAlimentar}>Alimentar</Button>
        <Button style={styles.botao} onPress={acaoBrincar}>Brincar</Button>
        <Button onPress={acaoLimpar}>Limpar</Button>
        <Button onPress={acaoDormir}>Dormir</Button>
    </Card.Actions>
     <Text style={styles.texto}>Pokemon Sorteado: {pokemonSorteado ? pokemonSorteado.name.toUpperCase() : 'Nenhum'}</Text>
    <Text style={styles.texto}>Alimento:{alimentar}</Text>
    <Text style={styles.texto}>Brincar:{brincar}</Text>
    <Text style={styles.texto}>Limpar:{limpar}</Text>
    <Text style={styles.texto}>Sono:{dormir}</Text>
  </Card>
    </View>
      
  )
}

const styles = StyleSheet.create({
    container:{
     flex: 1,
     display: 'flex',
     justifyContent: 'center',
     alignItems: 'center',
     padding:5,
     backgroundColor: 'red',
     borderRadius: 10,
    },
   texto:{
    fontSize:20,
    color:'white',
    fontWeight: 900
   },
   card:{
     backgroundColor: 'rgba(171, 28, 28, 0.43)',
     elevation: 5,
     borderRadius:5
   },
   img:{
    backgroundColor: 'rgba(0, 172, 252, 0.43)',
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
   },
   botao:{
    backgroundColor:'black'
   }
})