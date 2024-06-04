import axios from "axios";
import React, { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Footer from "../components/Footer";
import FooterAdm from "../components/FooterAdm";

const CadastroAnimacao: React.FC = () => {
  const [animacao, setAnimacao] = useState<[]>([]);
  const [titulo, setTitulo] = useState<string>('');
  const [diretor, setDiretor] = useState<string>('');
  const [studio, setStudio] = useState<string>('');
  const [genero, setGenero] = useState<string>('');
  const [dt_lancamento, setDt_lancamento] = useState<string>('');
  const [sinopse, setSinopse] = useState<string>('');
  const [classificacao, setClassificacao] = useState<string>('');
  const [plataformas, setPlataformas] = useState<string>('');
  const [episodios, setEpisodios] = useState<string>('');
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
    if (!studio) {
      newErrors.studio = "O campo studio é obrigatório";
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
    if (!episodios) {
      newErrors.episodios = "O campo episodios é obrigatório";
    }
    setErrors(newErrors);

    return !Object.keys(newErrors).length;
  };

  const cadastrarAnimacao = async () => {
    if (validateForm()) {
      try {
        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('diretor', diretor);
        formData.append('studio', studio);
        formData.append('genero', genero);
        formData.append('dt_lancamento', dt_lancamento);
        formData.append('sinopse', sinopse);
        formData.append('classificacao', classificacao);
        formData.append('plataformas', plataformas);
        formData.append('episodios', episodios);

        const response = await axios.post('http://10.137.11.213:8000/api/series/cadastro', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setMessage('Filme cadastrado');
        setTimeout(() => setMessage(''), 3000);
        setTitulo('');
        setDiretor('');
        setStudio('');
        setGenero('');
        setDt_lancamento('');
        setSinopse('');
        setClassificacao('');
        setPlataformas('');
        setEpisodios('');
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
        return <Text style={styles.errorText}>Titulo já existe</Text>;
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

        <Text style={styles.Text1}>--------------- Cadastrar serie ----------------</Text>

        <View style={styles.alinhamento}>
          <TextInput style={styles.input} placeholder="titulo"
            value={titulo} onChangeText={setTitulo} multiline />
          {renderError('titulo')}
        </View>

        <View style={styles.alinhamento}>
          <TextInput style={styles.input} placeholder="Diretor"
            value={diretor} onChangeText={setDiretor} />
          {renderError('diretor')}
        </View>

        <View style={styles.alinhamento}>
          <TextInput style={styles.input} placeholder="Studio"
            value={studio} onChangeText={setStudio} />
          {renderError('studio')}
        </View>

        <View style={styles.alinhamentoGDt}>
          <TextInput style={styles.inputGenero} placeholder="Genero"
            value={genero} onChangeText={setGenero} />
          {renderError('genero')}
        </View>

        <View style={styles.alinhamentoCD}>
          <TextInput style={styles.inputClassificacao} placeholder="Classificação"
            value={classificacao} onChangeText={setClassificacao} />
          {renderError('classificacao')}
        </View>

        <View style={styles.alinhamentoGDt}>
          <TextInput style={styles.inputDate} placeholder="data de lancamento"
            value={dt_lancamento} onChangeText={setDt_lancamento} />
          {renderError('dt_lancamento')}
        </View>

        <View style={styles.alinhamentoCD}>
          <TextInput style={styles.inputDuracao} placeholder="Episodios"
            value={episodios} onChangeText={setEpisodios} />
          {renderError('episodios')}
        </View>

        <View style={styles.alinhamento}>
          <TextInput style={styles.inputSinopse} placeholder="Sinopse"
            value={sinopse} onChangeText={setSinopse} multiline />
          {renderError('sinopse')}
        </View>

        <View style={styles.alinhamento}>
          <TextInput style={styles.input} placeholder="plataformas"
            value={plataformas} onChangeText={setPlataformas} />
          {renderError('plataformas')}
        </View>


        <TouchableOpacity style={styles.button} onPress={cadastrarAnimacao}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>


      </ScrollView>
      <FooterAdm />
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
  inputDate: {
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
  },
  inputDuracao: {
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
    marginLeft: '52%',
    marginVertical: -70
  },
  inputClassificacao: {
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
    marginLeft: '52%',
    marginVertical: -70,
  },
  inputGenero: {
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: '45%',
  },
  inputSinopse: {
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

export default CadastroAnimacao;