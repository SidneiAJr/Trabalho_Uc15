import React, { useState } from 'react'
import { Avatar, Button, Card, Text } from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

export default function TelaTreinar() {
  const [alimentar,setAlimitar]=useState<Number>("")
  const [brincar,setbrincar]=useState<Number>("")
  const [limpar,setLimpar]=useState<Number>("")
  const [dormir,setDormir]=useState<Number>("")

  const acao = ()=>{
    let xp = 0;
    let vida = 100;
    let sono = 100;
    let energia = 0;

    if(xp>=17){
      console.log(`Pokemon recebeu tanto de xp ${xp++}`)
    } else {
      console.log(`Pokemon não xp suficiente para subir de nivel ${xp++}`)
    }
        if(vida>=17){
      console.log(`Pokemon recebeu um aumento de vida ${vida++}`)
    } else {
      console.log(`Pokemon não recebeu o aumento de vida ${vida++}`)
    }
        if(sono>=17){
      console.log(`Pokemon aumentou a sua quantidade de sono ${sono++}`)
    } else {
      console.log(`Pokemon não aumentou seu sono ${sono++}`)
    }
        if(energia>=17){
      console.log(`Pokemon aumentou sua energia${energia++}`)
    } else {
      console.log(`Pokemon não aumentou sua vida ${energia++}`)
    }

    

  }
  
  return (
      <Card>
    <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
    <Card.Content>
      <Text variant="titleLarge">Pokémon</Text>
      <Text variant="bodyMedium">Card | Pokemon</Text>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
    <Card.Actions>
      <Button>Treinar</Button>
      <Button>Jogar</Button>
      <Button>Comer</Button>
      <Button>Dormir</Button>
      <Button>Treinar</Button>
      <Button>Jogar</Button>
    </Card.Actions>
  </Card>
  )
}
