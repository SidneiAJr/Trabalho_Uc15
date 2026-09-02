export interface Lista {
  tamanho: number;
  data?: any[];                    
  keyExtractor?: (item: any) => string;
  renderItem?: (item: any) => React.ReactElement;
  horizontal?: boolean;
  onEndReached?: () => void;      
}

export interface Imagem {
  uri: string
  tamanho?: number
  largura?: number
  altura?: number
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center'
  borderRadius?: number
}

export interface Texto {
  tamanho: number;
  grossuraFonte: number;
  conteudo: string;              
  cor?: string;
  alinhamento?: 'left' | 'center' | 'right';
  numeroDeLinhas?: number;
}


export interface Botao {          
  tamanho: number;
  grossura: number;
  sombra: number;
  corFundo: string;
  titulo: string;                
  corTexto?: string;
  onPress: () => void;           
  desabilitado?: boolean;
}

export interface Container {
  flex?: number
  largura?: number | string        
  altura?: number | string
  larguraMinima?: number
  larguraMaxima?: number
  alturaMinima?: number
  alturaMaxima?: number
  padding?: number
  paddingHorizontal?: number
  paddingVertical?: number
  margin?: number
  marginHorizontal?: number
  marginVertical?: number
  corFundo?: string
  borda?: {
    espessura: number
    cor: string
    raio?: number                  
    estilo?: 'solid' | 'dashed' | 'dotted'
  }
  sombra?: {
    cor: string
    deslocamentoX: number
    deslocamentoY: number
    raio: number
    opacidade: number              
    elevacao: number              
  }
  opacidade?: number
  direcao?: 'row' | 'column'
  justificar?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  alinhar?: 'flex-start' | 'flex-end' | 'center' | 'stretch'
  wrap?: boolean
  children: React.ReactNode
  rolavel?: boolean               
  clicavel?: boolean             
  onPress?: () => void
}

export interface InputText {
  valor: string
  aoMudar: (texto: string) => void
  placeholder?: string
  corFundo?: string
  corTexto?: string
  seguro?: boolean               // para senhas
  editavel?: boolean
  autoFoco?: boolean
}