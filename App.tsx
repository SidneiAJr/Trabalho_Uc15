import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TelaPrincipal from './screen/TelaPrincipal'
import TelaTreinar from './screen/TelaTreinar'
import TelaListaPokemons from './screen/TelaListaPokemons'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" options={{ headerShown: false }}>
        <Stack.Screen name="Home" component={TelaPrincipal} options={{ headerShown: false }} />
        <Stack.Screen name="TelaTreinar" component={TelaTreinar} options={{ headerShown: false }} />
        <Stack.Screen name="TelaLista" component={TelaListaPokemons} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}