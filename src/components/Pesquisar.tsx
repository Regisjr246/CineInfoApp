
import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";
import FooterAdm from "../components/FooterAdm";

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

const Pesquisar: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [pesquisa, setPesquisa] = useState<string>('');

  useEffect(() => {
    pesquisaFilme();
  }, []);

  const pesquisaFilme = async () => {
    try {
      const buscar = {
        pesquisa: pesquisa
      }

 
      const response = await axios.get('http://10.137.11.215:8000/api/adm/filmes/pesquisar', buscar);

      if (response.status === 200) {
        setPesquisa(response.data.data);
        //    console.log(pesquisa);
      }
    } catch (error) {
      console.log('Não há nada no registro');
    }
  }



  return (
    <View style={styles.container}>
      <View>

      </View>


      <View>
        <TextInput placeholder="Pesquisar" style={styles.pesquisar} onChangeText={setPesquisa} ></TextInput>
        <TouchableOpacity style={styles.pesquisa} onPress={pesquisaFilme}><Text>Pesquisar</Text></TouchableOpacity>
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  item: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    marginStart: 110,
    marginTop: 10
  },
  pesquisar: {
    borderWidth: 1,
    borderColor: 'black',
    height: 40,
    width: 380,
    borderRadius: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginVertical: 10
  },
  Logo: {
    height: 150,
    width: 300,
    marginTop: 20,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  pesquisa: {
    borderWidth: 1,
    height: 100,
    width: 100,
    backgroundColor: 'orange'
  }
});

export default Pesquisar;