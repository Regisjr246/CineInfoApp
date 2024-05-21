import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AtualizarFilme: React.FC = () => {
    const [filme, setFilme] = useState<[]>([]);
    const [id, setId] = useState<string>('');
    const [titulo, setTitulo] = useState<string>('');
    const [diretor, setDiretor] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [dt_lancamento, setDt_lancamento] = useState<string>('');
    const [sinopse, setSinopse] = useState<string>('');
    const [elenco, setElenco] = useState<string>('');
    const [classificacao, setClassificacao] = useState<string>('');
    const [plataformas, setPlataformas] = useState<string>('');
    const [duracao, setDuracao] = useState<string>('');

    const cadastrarFilme = async () => {
        try{
        const formData = new FormData();
        formData.append('id', id);
        formData.append('titulo', titulo);
        formData.append('diretor', diretor);
        formData.append('genero', genero);
        formData.append('dt_lancamento', dt_lancamento);
        formData.append('sinopse', sinopse);
        formData.append('elenco', elenco);
        formData.append('classificacao', classificacao);
        formData.append('plataformas', plataformas);
        formData.append('duracao', duracao);

        const response = await axios.put('http://10.137.11.213:8000/api/filmes/update', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }            
        });
    } catch(error) {
        console.log(error);
    }
    }

    useEffect(() => {
        async function fetchData() {
          try{
              const response = await axios.get("http://127.0.0.1:8000/api/find/clientes/"+id);
              setId(response.data.data.id);
              setTitulo(response.data.data.titulo);
              setDiretor(response.data.data.diretor);
              setGenero(response.data.data.genero);
              setDt_lancamento(response.data.data.dt_lancamento);
              setSinopse(response.data.data.sinopse);
              setElenco(response.data.data.elenco);
              setClassificacao(response.data.data.classificacao);
              setPlataformas(response.data.data.plataformas);
              setDuracao(response.data.data.duracao);
          } catch(error){
              console.log("erro ao buscar dados da api");
          }
        }
        fetchData();
      }, []);


return (
    <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>CineInfo</Text>
            </View>
            <View style={styles.form}>
                <TextInput style={styles.input} placeholder="id"
                value={id} onChangeText={setId} keyboardType="numeric"/>
                
                <TextInput style={styles.input} placeholder="titulo"
                value={titulo} onChangeText={setTitulo} multiline/>

                <TextInput style={styles.input} placeholder="Diretor"
                value={diretor} onChangeText={setDiretor}/>

                <TextInput style={styles.input} placeholder="Genero"
                value={genero} onChangeText={setGenero}/>

                <TextInput style={styles.input} placeholder="dt_lancamento"
                value={dt_lancamento} onChangeText={setDt_lancamento}/>

                <TextInput style={styles.input} placeholder="Sinopse"
                value={sinopse} onChangeText={setSinopse} multiline/>

                <TextInput style={styles.input} placeholder="Elenco"
                value={elenco} onChangeText={setElenco} multiline/>

                <TextInput style={styles.input} placeholder="Classificacao"
                value={classificacao} onChangeText={setClassificacao}/>

                <TextInput style={styles.input} placeholder="plataformas"
                value={plataformas} onChangeText={setPlataformas}/>

                <TextInput style={styles.input} placeholder="Duracao"
                value={duracao} onChangeText={setDuracao}/>
        
                <TouchableOpacity style={styles.button} onPress={cadastrarFilme}>
                    <Text style={styles.buttonText}>Atualizar produção</Text>
                </TouchableOpacity>
            </View>

        </View>

);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        backgroundColor: 'black',
        paddingVertical: 10,
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    form: {
        padding: 10,
        backgroundColor: '#f0f0f0',
        marginBottom: 10
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
        borderRadius: 10
    },
    button: {
        backgroundColor: 'black',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    }
});

export default AtualizarFilme;