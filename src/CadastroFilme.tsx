import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icons from "./screens/Icons";
import axios from "axios";


const CadastroFilmes: React.FC = () => {
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

    const cadastrarFilmes = async () => {

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
        
    } catch(error) {
        console.log(error);
    }
    }









    return (


        <View style={styles.container}>

            <TouchableOpacity>
            <Image source={require('./assets/images/logo.png')} style={styles.Logo} />
            </TouchableOpacity>

            <ScrollView style={styles.Login}>

                <Text style={styles.Text1}>--------------- Cadastrar Stream ----------------</Text>

             
                <TextInput style={styles.input} placeholder="Título" placeholderTextColor="#D94F04"
                    value={titulo} onChangeText={setTitulo}
                />

            
                <TextInput style={styles.input} placeholder="Diretor" placeholderTextColor="#D94F04"
                    value={diretor} onChangeText={setDiretor}
                />

              
                <TextInput style={styles.inputGenero} placeholder="Gênero" placeholderTextColor="#D94F04"
                  value={genero} onChangeText={setGenero}
                />


<TextInput style={styles.inputClassificacao} placeholder="Classificação" placeholderTextColor="#D94F04"
                     value={classificacao} onChangeText={setClassificacao}
                />

            
                <TextInput style={styles.inputDate} placeholder="Data de Lançamento" placeholderTextColor="#D94F04"
                  value={dt_lancamento} onChangeText={setDt_lancamento}
                />

             
                <TextInput style={styles.inputDuracao} placeholder="Duração" placeholderTextColor="#D94F04"
                    value={duracao} onChangeText={setDuracao}
                />

                
              
                <TextInput style={styles.inputSinopse} placeholder="Sinopse" placeholderTextColor="#D94F04"
                      value={sinopse} onChangeText={setSinopse}
                />

           
                <TextInput style={styles.input} placeholder="Elenco" placeholderTextColor="#D94F04"
                     value={elenco} onChangeText={setElenco}
                />

             

              
                <TextInput style={styles.input} placeholder="Plataformas" placeholderTextColor="#D94F04"
                   value={plataformas} onChangeText={setPlataformas}
                />
       

          
              


                <TouchableOpacity style={styles.button} onPress={cadastrarFilmes}>
                    <Text style={styles.buttonText}>Cadastrar</Text>
                </TouchableOpacity>




            </ScrollView>
        </View>





    );
}


const styles = StyleSheet.create({
    Login: {
        marginTop: 30
    },
    Text1: {
        marginRight: 'auto',
        marginLeft: 'auto',
        fontSize: 15,
        marginBottom:15
    },
    Text: {

        marginTop: -11
    },




    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF'
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
    forgotPassword: {
        color: '#D94F04',
        textAlign: 'center',
        fontSize: 10,

    },
    Icons: {
        marginTop: 20
    },
    Text2: {
        color: 'black',
        marginLeft: 'auto',
        marginRight: 'auto',
        fontSize: 20,
        fontWeight: 'bold'
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
        width: '48%',
       
    },

    inputDuracao:{
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D94F04',
        color: 'black',
        width: '48%',
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
        width: '48%',
        marginLeft:'52%',
        marginVertical: -70
    },
    inputGenero:{
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D94F04',
        color: 'black',
        width: '48%',
    },
    inputSinopse:{
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D94F04',
    color: 'black',
    width: 360,
    height:100,
    
}
});
export default CadastroFilmes;
