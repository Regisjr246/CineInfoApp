import axios from "axios";
import React, { useState } from "react";
import { Image, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Footer from "../components/Footer";
import FooterAdm from "../components/FooterAdm";

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
  ;

  const validateForm = () => {
    const newErrors: any = {};

    if (!titulo) {
      newErrors.titulo = "O campo titulo é obrigatório";
    } else if (titulo.length < 2) {
      newErrors.titulo = "O campo titulo deve ter pelo menos 2 caracteres";
    } else if (titulo.length > 100) {
      newErrors.titulo = "O campo titulo deve ter no maximo 100   caracteres";
    }

    if (!diretor) {
      newErrors.diretor = "O campo diretor é obrigatório";
    } else if (diretor.length < 3) {
      newErrors.diretor = "O campo diretor deve ter pelo menos 3 caracteres";
    } else if (diretor.length > 100) {
      newErrors.diretor = "O campo diretor deve ter no maximo 100 caracteres";
    }

    if (!dt_lancamento) {
      newErrors.dt_lancamento = "O campo dt_lancamento é obrigatório"
    } else if (dt_lancamento.length < 10) {
      newErrors.dt_lancamento = "O campo dt_lancamento deve ser:ANO-MES-DIA ";
    } else if (dt_lancamento.length > 10) {
      newErrors.dt_lancamento = "O campo dt_lancamento ter no maximo 10 caracteres";
    }



    if (!genero) {
      newErrors.genero = "O campo genero é obrigatório";
    } else if (genero.length < 3) {
      newErrors.genero = "O campo genero deve ter pelo menos 3 caracteres";
    } else if (genero.length > 100) {
      newErrors.genero = "O campo genero deve ter pelo menos 100 caracteres";
    }


    if (!sinopse) {
      newErrors.sinopse = "O campo sinopse é obrigatório";
    } else if (sinopse.length < 3) {
      newErrors.sinopse = "O campo sinopse deve ter pelo menos 3 caracteres";
    } else if (sinopse.length > 1000) {
      newErrors.sinopse = "O campo sinopse deve ter pelo menos 1000 caracteres";
    }

    if (!elenco) {
      newErrors.elenco = "O campo elenco é obrigatório";
    } else if (elenco.length < 3) {
      newErrors.elenco = "O campo elenco deve ter pelo menos 3 caracteres";
    } else if (elenco.length > 100) {
      newErrors.elenco = "O campo elenco deve ter pelo maximo 100 caracteres";
    }

    if (!classificacao) {
      newErrors.classificacao = "O campo classificacao é obrigatório";
    } else if (classificacao.length < 3) {
      newErrors.classificacao = "O campo classificacao deve ter pelo menos 3 caracteres";
    } else if (classificacao.length > 15) {
      newErrors.classificacao = "O campo classificacao deve ter no maximo 15 caracteres";
    }


    if (!plataformas) {
      newErrors.plataformas = "O campo plataformas é obrigatório";
    } else if (plataformas.length < 3) {
      newErrors.plataformas = "O campo plataformas deve ter pelo menos 3 caracteres";
    } else if (plataformas.length > 255) {
      newErrors.plataformas = "O campo plataformas deve ter no maximo 255 caracteres";
    }

    if (!duracao) {
      newErrors.duracao = "O campo duracao é obrigatório";
    } else if (duracao.length < 2) {
      newErrors.duracao = "O campo duracao ser: Hora:Min:Segundos";
    } else if (duracao.length > 8) {
      newErrors.duracao = "O campo duracao ter no maximo 8 caracteres";
    }

    setErrors(newErrors);

    return !Object.keys(newErrors).length;
  };


  const cadastrarFilme = async () => {
    if (validateForm()) {
      try {
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
        setErrors(response.data)
        //console.log(errors.classi)
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
      return <Text style={styles.errorText}>{errors[name]}</Text>;
    }
    return null;
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image source={require('../assets/images/logo.png')} style={styles.Logo} />
      </TouchableOpacity>
      <View style={styles.alinha}>{message && <View style={styles.message}><Text style={styles.messageText}>{message}</Text></View>}</View>

      <ScrollView style={styles.scroll}>

        <Text style={styles.Text1}>--------------- Cadastrar Stream ----------------</Text>

        <View style={styles.alinhamento}>
          {renderError('titulo')}
          <TextInput style={styles.input} placeholder="titulo"
            value={titulo} onChangeText={setTitulo} multiline />

        </View>

        <View style={styles.alinhamento}>
          {renderError('diretor')}
          <TextInput style={styles.input} placeholder="Diretor"
            value={diretor} onChangeText={setDiretor} />

        </View>

        <View style={styles.alinhamentoGDt}>
          {renderError('genero')}
          <TextInput style={styles.inputGenero} placeholder="Genero"
            value={genero} onChangeText={setGenero} />

        </View>

        <View style={styles.alinhamentoCD}>
          {renderError('classificacao')}
          <TextInput style={styles.inputClassificacao} placeholder="Classificação"
            value={classificacao} onChangeText={setClassificacao} />

        </View>
        {renderError('dt_lancamento')}
        <View style={styles.alinhamentoGDt}>
          <TextInput style={styles.inputDate} placeholder="data de lancamento"
            value={dt_lancamento} onChangeText={setDt_lancamento} />

        </View>
        {renderError('duracao')}
        <View style={styles.alinhamentoCD}>
          <TextInput style={styles.inputDuracao} placeholder="Duracao"
            value={duracao} onChangeText={setDuracao} />

        </View>

        <View style={styles.alinhamento}>
          {renderError('sinopse')}
          <TextInput style={styles.inputSinopse} placeholder="Sinopse"
            value={sinopse} onChangeText={setSinopse} multiline />

        </View>

        <View style={styles.alinhamento}>
          {renderError('elenco')}
          <TextInput style={styles.input} placeholder="Elenco"
            value={elenco} onChangeText={setElenco} multiline />

        </View>

        <View style={styles.alinhamento}>
          {renderError('plataformas')}
          <TextInput style={styles.input} placeholder="plataformas"
            value={plataformas} onChangeText={setPlataformas} />

        </View>


        <TouchableOpacity style={styles.button} onPress={cadastrarFilme}>
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
  },
  message: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    marginTop: 1,
    alignItems: 'center',
    width: 300

  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  alinha: {
    alignItems: 'center'
  }
});


export default CadastroFilme;