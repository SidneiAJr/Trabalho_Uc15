import { StyleSheet, Text, View,TextInput,FlatList,TouchableOpacity,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import axios from 'axios'

export default function TelaListaPokemons() {
    const [pokemons, setpokemons] = useState([])
    const [carregando,setcarregando]=useState(true)
    const [busca,setbusca]=useState('')
    const [pokemonSelecionado, setPokemonSelecionado] = useState<any>(null)
    const [modalAberto, setModalAberto] = useState(false)
    const [pokemonDetalhes, setPokemonDetalhes] = useState<any>(null)
     const filtrados = pokemons.filter((item: any) =>item.name.includes(busca.toLowerCase())
)
useEffect(()=>{
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=1000')
        .then(resposta=>{
           setpokemons(resposta.data.results)
            setcarregando(false)
        })
},[])
  return (
    <View style={styles.container}>
      <View style={styles.container_img}>
      </View>
      <Text style={styles.texto}>Pokedex</Text>
    <TextInput
                style={styles.input}
                placeholder="Buscar Pokemon..."
                value={busca}
                onChangeText={setbusca}
              />
    <FlatList
    data={filtrados}
      keyExtractor={(item: any) => item.name}
        renderItem={({ item, index }: any) => (
            <TouchableOpacity  onPress={ async() => {
    setPokemonSelecionado(item)
    setModalAberto(true)
    try {
      const resposta = await axios.get(item.url)
      setPokemonDetalhes(resposta.data)
    } catch (error) {
      console.log('Erro ao buscar detalhes:', error)
    }
  }}>
          <View style={styles.card}>
            <Image
              style={styles.imagem}
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${item.url.split('/').filter(Boolean).pop()}.png` }}
            />
            <Text style={styles.nome}>{item.name}</Text>
          </View>
          </TouchableOpacity>
        )}
      />
      </View>
  )
}

const styles = StyleSheet.create({
     container: { flex: 1, padding: 20, backgroundColor: '#00a7e9ff' },
    card: { flexDirection: 'row', alignItems: 'center', padding: 5, marginBottom: 5, backgroundColor: '#ffffffff', borderRadius: 8 },
    imagem: { width: 60, height: 60, marginRight: 16 },
    nome: { fontSize: 20, fontWeight: 'bold', textTransform: 'capitalize' },
    input: { borderWidth: 1, borderColor: '#fffbfbff', borderRadius: 8, padding: 10, marginBottom: 16, fontSize: 16 },
    texto:{fontSize:30, display:'flex',justifyContent: 'center',alignItems: 'center',textAlign: 'center',fontWeight:900},
    container_img:{display: 'flex', justifyContent: 'center', alignItems: 'center'},
})