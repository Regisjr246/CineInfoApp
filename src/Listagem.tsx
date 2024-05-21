import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity } from "react-native";

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

const ListagemFilmes: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);

  useEffect(() => {
    ListagemFilmes();
  }, []);

  const ListagemFilmes = async () => {
    try {
      const response = await axios.get('http://192.168.1.103:8000/api/filmes/listagem');
      if (response.status === 200) {
        setFilmes(response.data);
        console.log(filmes);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({ item }: { item: Filme }) => (
    <View style={styles.item} key={item.id}>
      <Text style={styles.textNome}>{item.titulo}</Text>
      <Text style={styles.textIngredientes}>{item.diretor}</Text>
      <Text style={styles.textValor}>{item.genero}</Text>
      <Text style={styles.textValor}>{item.dt_lancamento}</Text>
      <Text style={styles.textValor}>{item.sinopse}</Text>
      <Text style={styles.textValor}>{item.elenco}</Text>
      <Text style={styles.textValor}>{item.classificacao}</Text>
      <Text style={styles.textValor}>{item.plataformas}</Text>
      <Text style={styles.textValor}>{item.duracao}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <Image source={require('./assets/images/logo.png')} style={styles.Logo} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filmes}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {},
  footerIcon: {},
  container: {},
  hIcon: {},
  especialides: {},
  item: {},
  textNome: {
    color: 'black',
  },
  textIngredientes: {},
  textValor: {},
  Logo: {
    height: 150,
    width: 300,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  }
});

export default ListagemFilmes;