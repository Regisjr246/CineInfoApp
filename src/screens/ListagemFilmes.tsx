import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, TextInput } from "react-native";
import FooterAdm from "../components/FooterAdm";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";



interface Filme {
  id: string;
  titulo: string;
  diretor: string;
  genero: string;
  dt_lancamento: string;
  sinopse: string;
  elenco: string;
  classificacao: string;
  plataformas: string;
  duracao: string;
}


const ListagemF: React.FC = () => {
  const [pesquisa, setPesquisa] = useState<string>("");
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [elementVisible, setElementVisible] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  
  useEffect(() => {
    ListagemFilmes();
  }, []);


// Filme
const ListagemFilmes = async () => {
  try {
    if(pesquisa != ""){
    const response = await axios.get('http://10.137.11.233/api/adm/filmes/pesquisar/'+pesquisa);
    setFilmes(response.data.data);
    } else {
      const response = await axios.get('http://10.137.11.233/api/adm/filmes/listagem');
    setFilmes(response.data.data);
    }
  } catch (error) {
    console.log(error);
  }
}

const Delete = async (id: number) => {
  axios.delete('http://10.137.11.233/api/adm/filmes/delete/' + id).then(function (response) {ListagemFilmes();}
  ).catch(function (error) {
  console.log(error)
  ListagemFilmes();
})
}



const renderItem = ({ item }: { item: Filme }) => (
  <View style={styles.item} key={item.id}>
    <ScrollView>
    <TouchableOpacity onPress={() =>
        setElementVisible(elementVisible === item.id ? null : item.id)} > 
        <Image source={require('../assets/images/AvadaKedavra.jpg')} style={styles.AvadaKedavra}/>
        {elementVisible === item.id && ( 
      <View >
    <Text style={styles.tituloText}>{item.titulo}</Text>
    <Text style={styles.generoText}>{item.genero}</Text>
    <Text style={styles.classificacaoText}> {item.classificacao}</Text>
    <Text style={styles.dataText}>Lançamento {item.dt_lancamento}</Text>
    <Text style={styles.text}>Diretor: {item.diretor}</Text>
    <Text style={styles.text}>sinopse: {item.sinopse}</Text>
    <Text style={styles.text}>elenco: {item.elenco}</Text>
    <Text style={styles.text}>{item.plataformas}</Text>
    <Text style={styles.duracaoText}>Duração: {item.duracao}</Text>
    <TouchableOpacity onPress={() => Delete(item.id)}>
    <Image source={require('../assets/images/trash.png')}style={styles.trash}/>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('EditarFilmes', { item })}>
                <Image source={require('../assets/images/pen.png')} style={styles.editarImage} />
    </TouchableOpacity>
    </View >
    )} 
      </TouchableOpacity>
      </ScrollView>
  </View>
);


const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View>
        <TouchableOpacity>
          <Image source={require('../assets/images/logo.png')} style={styles.Logo} />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => ListagemFilmes()} style={styles.button}>
          <Image source={require('../assets/images/refresh.png')} style={styles.refresh} />
        </TouchableOpacity>

      </View>

     <View>
      <TextInput style={styles.pesquisa} placeholder="Pesquisar" onChangeText={setPesquisa} />
        <TouchableOpacity onPress={ListagemFilmes}><Text>Pesquisar</Text></TouchableOpacity>
     </View>

      <FlatList
        data={filmes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          ListagemFilmes().then(() => setRefreshing(false));
        }}
      />

    <FooterAdm/>
    </View>
  );
};

const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    editarImage: {
      height: 60,
      width: 60,
      marginTop: -43,
      left: 30
  },
  pesquisa:{
    borderWidth:1,
    borderRadius:20,
    height:50,
    width:380,
    marginLeft:'auto',
    marginRight:'auto'  
  },

  item: {
    marginTop: 10,
    width: 175,
    marginLeft:20
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  AvadaKedavra: {
    borderRadius: 20,
    height: 250,
    width: 170,
    marginTop: 20,
    marginRight:10
  },
  trash: {
    height: 30,
    width: 30,
  },
  button: {
    height: 50,
    width: 50,
    left: 180,
  },
  tituloText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
},
  generoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
},
  classificacaoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#DC143C',
    width: 48,
    borderRadius: 10
},
  dataText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',

},
  duracaoText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
},
  refresh: {
    height: 70,
    width: 70,
    marginTop: -180,
    left: 150
},
  Logo: {
    height: 150,
    width: 300,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default ListagemF;