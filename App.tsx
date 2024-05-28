import React from 'react';
import CadastroFilme from './src/screens/CadastroFilme';
import AtualizarFilme from './src/screens/AtualizarFilme';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/LoginScreen';
import CadastroSerie from './src/screens/CadastroSerie';
import ListagemF from './src/screens/ListagemFilmes';
import EditarFilmes from './src/screens/AtualizarFilme';

const Stack = createStackNavigator();


function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name='Listagem' component={ListagemF}
         options={{ headerShown: false }} />

      <Stack.Screen name='CadastroFilme' component={CadastroFilme} 
        options={{ headerShown: false }} />

      <Stack.Screen name='Login' component={LoginScreen} 
        options={{ headerShown: false }} />

      <Stack.Screen name='CadastroSerie' component={CadastroSerie} 
        options={{ headerShown: false }} />

      <Stack.Screen name='EditarFilmes' component={EditarFilmes}
         options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
