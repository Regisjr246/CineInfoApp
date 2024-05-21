import axios from "axios";
import React, { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Footer from "../components/Footer";

const CadastroFilme: React.FC = () => {
    const [filme, setFilme] = useState<[]>([]);
    const [titulo, setTitulo] = useState<string>('');
    const [diretor, setDiretor] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [dt_lancamento, setDt_lancamento] = useState<string>('');
    const [sinopse, setSinopse] = useState<string>('');
    const [elenco, setElenco] = useState<string>('');
    const [classificacao, setClassificacao] = useState<string>('');
    const [plataformas, setPlataformas] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');
    const [errors, setErrors] = useState<any>({});
    const [message, setMessage] = useState<string>('');


    const validateForm = () => {
      const newErrors: any = {};
  
      if (!titulo) {
        newErrors.titulo = "O campo título é obrigatório";
      }
      if (!diretor) {
        newErrors.diretor = "O campo diretor é obrigatório";
      }
      if (!genero) {
        newErrors.genero = "O campo gênero é obrigatório";
      }
      if (!dt_lancamento) {
        newErrors.dt_lancamento = "O campo data de lançamento é obrigatório";
      }
      if (!sinopse) {
        newErrors.sinopse = "O campo sinopse é obrigatório";
      }
      if (!classificacao) {
        newErrors.classificacao = "O campo classificação é obrigatório";
      }
      if (!plataformas) {
        newErrors.plataformas = "O campo plataformas é obrigatório";
      }
      if (!duracao) {
        newErrors.duracao = "O campo duração é obrigatório";
      }
      setErrors(newErrors);
  
      return !Object.keys(newErrors).length;
    };


    const cadastrarFilme = async () => {
        if (validateForm()) {
        try{
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('diretor', diretor);
        formData.append('genero', genero);
        formData.append('dt_lancamento', dt_lancamento);
        formData.append('sinopse', sinopse);
        formData.append('elenco', elenco);
        formData.append('classificacao', classificacao);
        formData.append('plataformas', plataformas);
        formData.append('duracao', duracao);

        const response = await axios.post('http://10.137.11.215:8000/api/filmes/cadastro', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
        });
    setMessage('Filme cadastrado');
        setTimeout(() => setMessage(''), 3000);
        setTitulo('');
        setDiretor('');
        setGenero('');
        setDt_lancamento('');
        setSinopse('');
        setElenco('');
        setClassificacao('');
        setPlataformas('');
        setDuracao('');
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
        } else {
          setMessage('Não cadastrado');
          setTimeout(() => setMessage(''), 3000);
        }
      }
    }
  };

  const renderError = (name: string) => {
    if (errors[name]) {
      if (name === 'titulo' && errors[name].unique) {
        return <Text style={styles.errorText}>Titulo already exists</Text>;
      }
      return <Text style={styles.errorText}>{errors[name]}</Text>;
    }
    return null;
  };


  return (
    <View style={styles.container}>
            <TouchableOpacity>
            <Image source={require('../assets/images/logo.png')} style={styles.Logo} />
            </TouchableOpacity>

            <ScrollView style={styles.scroll}>

                <Text style={styles.Text1}>--------------- Cadastrar Stream ----------------</Text>
                
                <View style={styles.alinhamento}>
                <TextInput style={styles.input} placeholder="titulo"
                value={titulo} onChangeText={setTitulo} multiline/>
                {renderError('titulo')}
                </View>

                <View style={styles.alinhamento}>
                <TextInput style={styles.input} placeholder="Diretor"
                value={diretor} onChangeText={setDiretor}/>
                {renderError('diretor')}
                </View>

                <View style={styles.alinhamentoGDt}>
                <TextInput style={styles.inputGenero} placeholder="Genero"
                value={genero} onChangeText={setGenero}/>
                {renderError('genero')}
                </View>

                <View style={styles.alinhamentoCD}>
                <TextInput style={styles.inputClassificacao} placeholder="Classificação"
                value={classificacao} onChangeText={setClassificacao}/>
                {renderError('classificacao')}
                </View>

                <View style={styles.alinhamentoGDt}>
                <TextInput style={styles.inputDate} placeholder="data de lancamento"
                value={dt_lancamento} onChangeText={setDt_lancamento}/>
                {renderError('dt_lancamento')}
                </View>

                <View style={styles.alinhamentoCD}>
                <TextInput style={styles.inputDuracao} placeholder="Duracao"
                value={duracao} onChangeText={setDuracao}/>
                {renderError('duracao')}
                </View>

                <View style={styles.alinhamento}>
                <TextInput style={styles.inputSinopse} placeholder="Sinopse"
                value={sinopse} onChangeText={setSinopse} multiline/>
                {renderError('sinopse')}
                </View>

                <View style={styles.alinhamento}>
                <TextInput style={styles.input} placeholder="Elenco"
                value={elenco} onChangeText={setElenco} multiline/>
                {renderError('elenco')}
                </View>

                <View style={styles.alinhamento}>
                <TextInput style={styles.input} placeholder="plataformas"
                value={plataformas} onChangeText={setPlataformas}/>
                {renderError('plataformas')}
                </View>

        
                <TouchableOpacity style={styles.button} onPress={cadastrarFilme}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>


            </ScrollView>
            <Footer/>
        </View>

);
}

const styles = StyleSheet.create({
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
        marginBottom:15
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
    button: {
        backgroundColor: '#D94F04',
        height: 60,
        borderRadius: 20,
        width: 350,
        fontSize: 50,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom:15,
        marginTop:9
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
        width: '45%',
    },
    inputDuracao:{
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D94F04',
        color: 'black',
        width: '45%',
        marginLeft:'52%',
        marginVertical: -70
    },
    inputClassificacao:{
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D94F04',
        color: 'black',
        width: '45%',
        marginLeft:'52%',
        marginVertical: -70,
    },
    inputGenero:{
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D94F04',
        color: 'black',
        width: '45%',
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
})

export default CadastroFilme;