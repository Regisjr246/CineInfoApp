import React, { useEffect, useState, } from "react";
import { StatusBar, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView } from "react-native";
import axios from "axios";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
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


const EditarFilmes: React.FC = () => {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [titulo, SetTitulo] = useState<string>('');
  const [diretor, SetDiretor] = useState<string>('');
  const [genero, SetGenero] = useState<string>('');
  const [dt_lancamento, SetDt_lancamento] = useState<string>('');
  const [sinopse, SetSinopse] = useState<string>('');
  const [elenco, SetElenco] = useState<string>('');
  const [classificacao, SetClassificacao] = useState<string>('');
  const [plataformas, SetPlataformas] = useState<string>('');
  const [duracao, SetDuracao] = useState<string>('');
  const [id, SetId] = useState<string>('');



  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
      const { item } = route.params;

      SetId(item.id);
      SetTitulo(item.titulo);
      SetDiretor(item.diretor);
      SetGenero(item.genero);
      SetDt_lancamento(item.dt_lancamento);
      SetSinopse(item.sinopse);
      SetElenco(item.elenco);
      SetClassificacao(item.classificacao);
      SetPlataformas(item.plataformas);
      SetDuracao(item.duracao);

  },[]);


  const atualizar = () => {
      const dadosDoFilme= {
        id:id,
          titulo: titulo,
          diretor: diretor,
          genero: genero,
          dt_lancamento: dt_lancamento,
          sinopse: sinopse,
          elenco: elenco,
          classificacao: classificacao,
          plataformas: plataformas,
          duracao:duracao
      };
      axios.put("http://10.137.11.233:8000/api/adm/filmes/update", dadosDoFilme, {
          headers: {
              "Accept": "application/json",
              "Content-Type": "application/json"
          }
      }).then(response => {
          console.log(response.data);
          navigation.goBack(); 
      }).catch(error => {
          console.error(error);
      });
  }



  return (


      <View style={styles.container}>

          <TouchableOpacity>
              <Image source={require('../assets/images/logo.png')} style={styles.Logo} />
          </TouchableOpacity>

          <ScrollView style={styles.scroll}>
              <Text style={styles.Text1}>--------------- Cadastrar Stream ----------------</Text>

              <View style={styles.alinhamento}>
                  <TextInput style={styles.input}
                      value={titulo}
                      onChangeText={SetTitulo}
                  />
              </View>

              <View style={styles.alinhamento}>
                  <TextInput style={styles.input}
                      value={diretor}
                      onChangeText={SetDiretor}
                  />
              </View>

              <View style={styles.alinhamento}>
                  <TextInput style={styles.inputGenero}
                      value={genero}
                      onChangeText={SetGenero}
                  />
              </View>

              <View style={styles.alinhamento}>
                  <TextInput style={styles.inputDate}
                      value={dt_lancamento}
                      onChangeText={SetDt_lancamento}
                  />
              </View>

            

              <View style={styles.alinhamento}>
                  <TextInput style={styles.inputClassificacao}
                      value={classificacao}
                      onChangeText={SetClassificacao}
                      multiline
                  />

              </View>
              <View style={styles.alinhamento}>
                  <TextInput style={styles.inputDuracao}
                      value={duracao}
                      onChangeText={SetDuracao}
                  />
              </View>

              <View style={styles.alinhamento}>
                  <TextInput style={styles.inputSinopse}
                      value={sinopse}
                      onChangeText={SetSinopse}
                  />
              </View>


              <View style={styles.alinhamento}>
                  <TextInput style={styles.input}
                      value={elenco}
                      onChangeText={SetElenco}
                  />
              </View>
             
              <View style={styles.alinhamento}>
                  <TextInput style={styles.input}
                      value={plataformas}
                      onChangeText={SetPlataformas}
                  />
              </View>

            
              <View style={styles.alinhamento}>
              <TouchableOpacity onPress={atualizar} style={styles.input2}>
                  <Text style={styles.TextVolta}>Editar</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.alinhamento}>
                  <TouchableOpacity style={styles.input2}
                      onPress={() => navigation.goBack()}>
                      <Text style={styles.TextVolta}>voltar</Text>
                  </TouchableOpacity>

              </View>

          </ScrollView>
          <FooterAdm/>

      </View>
  );
}



const styles = StyleSheet.create({
  TextVolta: {
      marginLeft: 'auto',
      marginRight: 'auto',
      color: '#FFF',
      fontSize: 20,
      marginTop: 5
  },
  container: {
      flex: 1,
      backgroundColor: '#FFF'
  },
  alinhamento: {
      alignItems: 'center',
  },
  alinhamentoGDt: {
      right: -16,
      width: -80,
  },
  alinhamentoCD: {
      right: 0,
      width: 390,
  },
  scroll: {
      marginTop: 30,
  },
  Text1: {
      marginRight: 'auto',
      marginLeft: 'auto',
      fontSize: 15,
      marginBottom: 15
  },
  errorText: {
      color: 'red',
      marginLeft: 10,
      marginVertical: 2,
      fontSize: 10,
  },
  input: {
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#D94F04',
      color: 'black',
      width: 360,
  },
  input2: {
      marginBottom: 20,
      paddingHorizontal: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#D94F04',
      color: 'black',
      width: 360,
      backgroundColor: '#D94F04',
      height: 40
  },
  button: {
      backgroundColor: '#D94F04',
      height: 60,
      borderRadius: 20,
      width: 350,
      fontSize: 50,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 15,
      marginTop: 9
  },
  buttonText: {
      fontSize: 25,
      width: 110,
      color: '#FFF',
      marginLeft: 118,
      marginTop: 13
  },
  Logo: {
      height: 150,
      width: 300,
      marginTop: 20,
      marginLeft: 'auto',
      marginRight: 'auto',
  },
  inputDate:{
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '40%',
    marginLeft:200,
    marginVertical:-70
},
inputDuracao:{
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '40%',
    marginLeft:'52%',
    marginVertical:-70
},
inputClassificacao:{
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
    marginLeft:'-45%',
    marginVertical: 10,
},
inputGenero:{
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
    marginLeft:-180
},
inputSinopse:{
marginBottom: 20,
paddingHorizontal: 10,
borderRadius: 8,
borderWidth: 1,
borderColor: '#D94F04',
color: 'black',
width: 360,
height: 70,
}
});
export default EditarFilmes;