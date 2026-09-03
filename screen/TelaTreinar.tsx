import React, { useState, useEffect } from 'react'
import { Button, Card, Text } from 'react-native-paper';
import { StyleSheet, View, Image, Modal, TouchableOpacity } from 'react-native'
import axios from 'axios'
import { useAudioPlayer } from 'expo-audio'

const pokemonsIniciais = [
  { name: "cyndaquil", id: 155 },
  { name: "pikachu", id: 25 },
  { name: "squirtle", id: 7 },
  { name: "bulbasaur", id: 1 }
]

const evolucoes = {
  bulbasaur:  { nivel: 16, evolui: "ivysaur",     id: 2   },
  ivysaur:    { nivel: 32, evolui: "venusaur",    id: 3   },
  squirtle:   { nivel: 16, evolui: "wartortle",   id: 8   },
  wartortle:  { nivel: 36, evolui: "blastoise",   id: 9   },
  pikachu:    { nivel: 20, evolui: "raichu",      id: 26  },
  cyndaquil:  { nivel: 14, evolui: "quilava",     id: 156 },
  quilava:    { nivel: 36, evolui: "typhlosion",  id: 157 },
}


export default function TelaTreinar() {
  const [alimentar, setAlimentar] = useState(100)
  const [felicidade, setFelicidade] = useState(100)
  const [higiene, setHigiene] = useState(100)
  const [energia, setEnergia] = useState(100)
  const [pokemonSorteado, setPokemonSorteado] = useState<any>()
  const [escolhendo, setEscolhendo] = useState(false)
  const [level,setLevel] = useState(0)

  const player = useAudioPlayer(require('../pok.mp3'))
  const player2 = useAudioPlayer(require('../up.mp3'))

  const pokemonSemCondicoes =
    alimentar === 0 &&
    energia === 0 &&
    higiene === 0 &&
    felicidade === 0

  const tocar = async () => {
    await player.seekTo(0)
    player.play()
  }

  const tocar2 = async () => {
    await player2.seekTo(0)
    player2.play()
  }

  const getId = (url: any) => {
    const partes = url.split('/')
    return partes[partes.length - 2]
  }

  const acaoAlimentar = () => {
  if (alimentar >= 100) {
    alert("Seu Pokémon já está cheio! 🍎")
    return
  }

  setAlimentar(prev => Math.min(100, prev + 10))
  setFelicidade(prev => Math.min(100, prev + 5))
}

const acaoBrincar = () => {
  if (energia <= 0 ) {
    alert("Seu Pokémon está sem energia! 😴")
   
    return
  } else {
    setHigiene(prev => Math.max(0, prev - 10))

  }

  if (alimentar <= 0) {
    alert("Seu Pokémon está com fome! 🍎")
    return
  }

  setEnergia(prev => Math.max(0, prev - 15))
  setFelicidade(prev => Math.min(100, prev + 10))
  setAlimentar(prev => Math.max(0, prev - 5))

  // Ganha 1 nível
  setLevel(prev => prev + 1)
}

const acaoLimpar = () => {
  if (higiene >= 100) {
    alert("Seu Pokémon já está limpo! 🧼")
    return
  }

  setHigiene(prev => Math.min(100, prev + 20))
  setFelicidade(prev => Math.min(100, prev + 5))
}

const acaoDormir = () => {
  if (energia >= 100) {
    alert("Seu Pokémon não está cansado! 😴")
    return
  }

  setEnergia(prev => Math.min(100, prev + 30))
  setFelicidade(prev => Math.min(100, prev + 5))
}

  const escolherPokemon = (poke: any) => {
    setPokemonSorteado({ name: poke.name, url: `https://pokeapi.co/api/v2/pokemon/${poke.id}/` })
    setLevel(0)
    setEscolhendo(false)
  }

  useEffect(() => {
  if (!pokemonSorteado) return

  const nomeAtual = pokemonSorteado.name.toLowerCase() as keyof typeof evolucoes

  const evolucao = evolucoes[nomeAtual]

  if (evolucao && level >= evolucao.nivel) {
     tocar2()
    setPokemonSorteado({
      name: evolucao.evolui,
      url: `https://pokeapi.co/api/v2/pokemon/${evolucao.id}/`
    })
    setLevel(0)
  }
}, [level])

  return (
    <View style={styles.tela}>
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.topo}>
            <Text style={styles.titulo}>Minha Pokédex</Text>
            <Image
              source={{ uri: 'https://img.icons8.com/color/80/ultra-ball.png' }}
              style={styles.logo}
            />
          </View>
            <Text style={styles.level}>Nivel Atual:{level}</Text>
          <Card.Actions>
            <Button style={styles.botao} onPress={() => setEscolhendo(true)}>
              🎮 Escolher Inicial
            </Button>
          </Card.Actions>

          <Card.Cover
            style={styles.img}
            source={{
              uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonSorteado ? getId(pokemonSorteado.url) : '1'}.png`
            }}
          />

          <Card.Actions>
            <Button style={styles.botao2} onPress={acaoAlimentar} disabled={pokemonSemCondicoes}>Alimentar</Button>
            <Button style={styles.botao} onPress={acaoBrincar} disabled={pokemonSemCondicoes}>Brincar</Button>
            <Button style={styles.botao3} onPress={acaoLimpar} disabled={pokemonSemCondicoes}>Limpar</Button>
            <Button style={styles.botao4} onPress={acaoDormir} disabled={pokemonSemCondicoes} >Dormir</Button>
          </Card.Actions>

          <Text style={styles.texto}>
            Pokemon: {pokemonSorteado ? pokemonSorteado.name.toUpperCase() : 'Nenhum'}
          </Text>
        <Text style={styles.texto}>
  Saciedade: {alimentar}/100
</Text>

<Text style={styles.texto}>
  Energia: {energia}/100
</Text>

<Text style={styles.texto}>
  Higiene: {higiene}/100
</Text>

<Text style={styles.texto}>
  Felicidade: {felicidade}/100
</Text>
       
        </Card>
      </View>

      <Modal
        visible={escolhendo}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setEscolhendo(false)}
      >
        <View style={styles.modalFundo}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitulo}>Escolha seu Pokémon!</Text>

            <View style={styles.modalGrid}>
              {pokemonsIniciais.map((poke) => (
                <TouchableOpacity
                  key={poke.name}
                  style={styles.modalCard}
                  onPress={()=>{
                    tocar()
                   escolherPokemon(poke)
                  }
                  }
                >
                  <Image
                    source={{
                      uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png`
                    }}
                    style={styles.modalImg}
                  />
                  <Text style={styles.modalNome}>{poke.name.toUpperCase()}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Button onPress={() => setEscolhendo(false)}>Cancelar</Button>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#F5F5F5' },
  topo: { height: 150, backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center' },
  titulo: { fontSize: 26, fontWeight: 'bold', color: 'white', textAlign: 'center' },
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 5, backgroundColor: '#DC0A2D' },
  texto: { fontSize: 20, color: 'white', fontWeight: '900', textAlign: 'center' },
  card: { backgroundColor: '#f50000ce', elevation: 5, borderRadius: 10, borderColor: 'black', borderWidth: 6 },
  img: { backgroundColor: '#ffffff', borderRadius: 10, borderColor: 'black', borderWidth: 3 , height: 300},
  botao: { backgroundColor: 'black', marginRight: 1 },
  botao2: { backgroundColor: 'red' },
  botao3: { backgroundColor: 'blue' },
  botao4: { backgroundColor: 'green' },
  logo: { width: 100, height: 100, borderColor: 'white', borderWidth: 2, borderRadius: 80 },
  modalFundo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', justifyContent: 'center', alignItems: 'center' },
  modalBox: { backgroundColor: '#3B82F6', borderRadius: 15, padding: 20, borderColor: 'black', borderWidth: 4, width: '85%' },
  modalTitulo: { fontSize: 22, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 15 },
  modalGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 10 },
  modalCard: { backgroundColor: '#1E40AF', borderRadius: 10, padding: 10, alignItems: 'center', width: '45%', borderColor: 'black', borderWidth: 2 },
  modalImg: { width: 80, height: 80 },
  modalNome: { color: 'white', fontWeight: 'bold', marginTop: 5 },
  level: {fontSize:35,color: 'white',fontWeight:900}
})