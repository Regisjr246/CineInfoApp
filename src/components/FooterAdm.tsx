import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

function FooterAdm(): React.ReactElement {
  
    const navigation = useNavigation(); 

    return (
      <View style={styles.footer}>
      <TouchableOpacity onPress={()=> navigation.navigate('Cadastro')}>
          <Image source={require('../assets/images/home.png')} 
          style={styles.footerIcon}/>
      </TouchableOpacity>
        <TouchableOpacity onPress={ () => navigation.navigate('listagem')}>
        <Image source={require('../assets/images/addUser.png')} 
          style={styles.footerIcon}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={require('../assets/images/user.png')} 
            style={styles.footerIcon}/>
        </TouchableOpacity>
        <TouchableOpacity>
            <Image source={require('../assets/images/config.png')} 
            style={styles.footerIcon}/>
        </TouchableOpacity>
        <TouchableOpacity>
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