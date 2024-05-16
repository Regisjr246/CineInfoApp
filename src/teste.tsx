import React, { useState } from "react";
import { StyleSheet, Image, Text, TextInput, Touchable, TouchableOpacity, View, ScrollViewBase, ScrollViewComponent, ScrollView } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Footer from '..//../Footer';
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import axios, { formToJSON } from "axios";


const CadastroClienteInvestidor: React.FC = () => {
    const [nome, setNome] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [endereco, setEndereco] = useState<string>('');
    const [telefone, setTelefone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [imagem, setImagem] = useState<string | undefined>('');
    const [errors, setErrors] = useState<any>({});
    const [message, setMessage] = useState<string>('');


    const validateForm = () => {
        const newErrors: any = {};
    
        if (!nome) {
          newErrors.nome = "O campo nome é obrigatório";
        }
    
        if (!email) {
          newErrors.email = "O campo email é obrigatório";
        }
    
        if (!endereco) {
          newErrors.endereco = "O campo endereço é obrigatório";
        }
    
        if (!telefone) {
          newErrors.telefone = "O campo telefone é obrigatório";
        }
    
        if (!password) {
          newErrors.password = "O campo senha é obrigatório";
        }
    
        if (!cpf) {
          newErrors.cpf = "O campo CPF é obrigatório";
        }
    
        if (!imagem) {
          newErrors.imagem = "Por favor, selecione uma imagem";
        }
    
        setErrors(newErrors);
    
        return !Object.keys(newErrors).length;
      };
    
      const selecionarImagem = () => {
        const options = {
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchImageLibrary(options, (response) => {
          if (response.didCancel) {
            console.log("cancelado pelo usuário");
          } else if (response.error) {
            console.log("erro ao abrir a galeria");
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setImagem(imageUri);
          }
        });
      };
    
      const abrirCamera = () => {
        const options = {
          mediaType: "photo",
          includeBase64: false,
          maxHeight: 2000,
          maxWidth: 2000,
        };
    
        launchCamera(options, (response) => {
          if (response.didCancel) {
            console.log("cancelado pelo usuário");
          } else if (response.error) {
            console.log("erro ao abrir a camera");
          } else {
            let imageUri = response.uri || response.assets?.[0]?.uri;
            setImagem(imageUri);
            console.log(imageUri);
          }
        });
      };
    
      const cadastrarCliente = async () => {
        if (validateForm()) {
          try {
            const formData = new FormData();
            formData.append("nome", nome);
            formData.append("email", email);
            formData.append("endereco", endereco);
            formData.append("telefone", telefone);
            formData.append("password", password);
            formData.append("cpf", cpf);
            formData.append("imagem", {
              uri: imagem || "",
              type: "image/jpeg",
              name: new Date() + ".jpg",
            });
    
            const response = await axios.post(
              "http://10.137.11.214:8000/api/clientes/cadastro",
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );setMessage('Cliente cadastrado');
            setTimeout(() => setMessage(''), 3000);
            setNome('');
            setCpf('');
            setEmail('');
            setEndereco('');
            setPassword('');
            setTelefone('');
            setImagem('');
            setImagem('');
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
        <View style={styles.container} >
<ScrollView>
            <View>
                <View style={styles.header}>
                <Image source={require('../../assets/images/MarcaDigitalizada.png')} style={styles.marca}/>

                </View>
            </View>
            <View style={styles.borda}>
                <ScrollView>
                <TouchableOpacity onPress={abrirCamera}>


                    {imagem ? <Image source={{ uri: imagem }} style={styles.user} /> : <Image source={require('../../assets/images/UserCliente.png')} style={styles.user} />}

                </TouchableOpacity>

                <View><TouchableOpacity onPress={selecionarImagem}>
              <Text style={styles.addFoto}>Selecionar foto</Text>
            </TouchableOpacity>
            {renderError("imagem")}</View>

                <View>
    <Text style={styles.text}>Nome</Text>
    <TextInput placeholder="Nome" style={styles.input} onChangeText={setNome} value={nome} ></TextInput>
    {renderError('nome')}
</View>

<View>
    <Text style={styles.text}>Email</Text>
    <TextInput keyboardType={'email-address'} placeholder="E-mail" style={styles.input} value={email} onChangeText={setEmail}></TextInput>
    {renderError('email')}
</View>

<View>
    <Text style={styles.text}>Endereço</Text>
    <TextInput placeholder="Endereço" style={styles.input} value={endereco} onChangeText={setEndereco}></TextInput>
    {renderError('endereco')}
</View>

<View>
    <Text style={styles.text}>CPF</Text>
    <TextInput keyboardType={'numeric'} placeholder="CPF" style={styles.input} value={cpf} onChangeText={setCpf}></TextInput>
    {renderError('cpf')}
</View>

<View>
    <Text style={styles.text}>Telefone</Text>
    <TextInput keyboardType={'numeric'} placeholder="Telefone" style={styles.input} value={telefone} onChangeText={setTelefone}></TextInput>
    {renderError('telefone')}
</View>

<View>
    <Text style={styles.text}>Senha</Text>
    <TextInput secureTextEntry={true} placeholder="Senha" style={styles.input} value={password} onChangeText={setPassword}></TextInput>
    {renderError('password')}
</View>
                

                <View style={styles.botaoRegistrar}><TouchableOpacity  onPress={cadastrarCliente}><Text style={styles.textRegistrar} >Registrar</Text></TouchableOpacity></View>
                <View style={styles.alinha}>{message && <View style={styles.message}><Text style={styles.messageText}>{message}</Text></View>}</View>

                </ScrollView>
            </View>

            </ScrollView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',

        flex: 1

    },

    hIcon: {
        alignItems: 'center',
        width: 150,
        height: 90,
        marginLeft: 130,
        marginTop: 5
    },

    input: {
        borderWidth: 2,
        borderRadius: 10,
        width: 300,
        height: 40,
        marginLeft: 15,
        borderColor: '#c7dcca',
        marginVertical: 5,
    },
    text: {
        marginLeft: 15,
        color: 'black',
        fontWeight: 'bold'
    },
    borda: {
        borderWidth: 1,
        borderColor: 'orangered',
        width: 350,
        padding: 10,
        borderRadius: 40,
        marginLeft: 25,
        backgroundColor: 'white',
        marginTop: 15,

    },
    addFoto: {
        marginLeft: 120,
        color: 'black',
        fontWeight: 'bold'
    },
    user: {
        borderWidth: 1,
        borderRadius: 50,
        width: 100,
        height: 100,
        marginLeft: 120
    },
    botaoRegistrar: {
        marginLeft: 110,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 20,
        width: 120,
        height: 40,
        backgroundColor: 'red',
        borderColor: 'red'
    },
    textRegistrar: {
        color: 'white',
        fontWeight: 'bold',
        marginLeft: 30,
        marginVertical: 8,
        fontSize: 15
    },
    imagemSelecionando: {
        width: 100,
        height: 90,
        marginTop: -90,
        borderRadius: 50,
        marginBottom: 10,
        marginLeft: 120
    },
    header: {
        backgroundColor: 'red',
        paddingVertical: 15,
        alignItems: 'center',
        borderRadius: 5



    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    errorText: {
        color: 'red',
        marginLeft: 15,
        marginVertical: 2,
        fontSize: 15,
    },
marca:{
    borderWidth:1,
    width:300,
    height:50,
    marginVertical:2,
    alignItems:'center',
    
},
message: {
  backgroundColor: 'green',
  padding: 8,
  borderRadius: 5,
  marginTop: 1,
  alignItems: 'center',
  width:300
 
},
messageText: {
  color: 'white',
  fontWeight: 'bold',
},
alinha:{
  alignItems:'center'
}
});

export default CadastroClienteInvestidor;