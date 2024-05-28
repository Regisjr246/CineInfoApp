import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function FooterAdm(): React.ReactElement {
    const [elementVisible, setElementVisible] = useState(false);
    const navigation = useNavigation(); 

    return (
      <View style={styles.footer}>
        <TouchableOpacity onPress={ () => navigation.navigate('Listagem')}>
        <Image source={require('../assets/images/home.png')} 
          style={styles.footerIcon}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate('Login')}>
            <Image source={require('../assets/images/user.png')} 
            style={styles.footerIcon}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={require('../assets/images/config.png')} 
            style={styles.footerIcon}/>
        </TouchableOpacity>
        
        {elementVisible ? ( 
        <View>
        <TouchableOpacity onPress={()=> navigation.navigate('CadastroFilme')}
        style={styles.cadastros}>
            <Text style={styles.cadastrosText}>Cadastro filmes</Text>
        </TouchableOpacity> 

        <TouchableOpacity onPress={()=> navigation.navigate('CadastroFilme')}
        style={styles.cadastros}>
            <Text style={styles.cadastrosText}>Cadastro filmes</Text>
        </TouchableOpacity>  

        <TouchableOpacity onPress={()=> navigation.navigate('AtualizarFilme')}
        style={styles.cadastros}>
        <Text style={styles.cadastrosText}>Cadastro animação</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> navigation.navigate('CadastroSerie')}
        style={styles.cadastros}> 
            <Text style={styles.cadastrosText}>Cadastro serie</Text>
        </TouchableOpacity>
        
        </View>
        ) : null} 

        <TouchableOpacity onPress={() => setElementVisible(!elementVisible)}>
            <Image source={require('../assets/images/plus.png')} 
            style={styles.footerIcon}/>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
    menuList: {
        flexGrow: 1
    },
    cadastros: {
        marginTop: -50,
        left: 70,
        margin: 10,
        backgroundColor: 'white'
    },
    cadastrosText: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15,
    },
    footer: {
        borderTopWidth: 0.2, 
        backgroundColor: 'white', 
        flexDirection: 'row',
        justifyContent: 'space-around', 
        alignItems: 'flex-end', 
        paddingVertical: 10
    }, 
    
    footerIcon: {
        width: 30, 
        height: 30
    }

});

export default FooterAdm; 