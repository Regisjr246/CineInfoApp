import React from 'react';
import CadastroFilme from './src/screens/CadastroFilme';
import AtualizarFilme from './src/screens/Atualizar';

import Listagem from './src/screens/Listagem';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function App(): React.ReactElement {
  return (
    <NavigationContainer>
      <Stack.Navigator >
      <Stack.Screen name='Cadastro' component={CadastroFilme} 
        options={{ headerShown: false }} />
       
       <Stack.Screen name='listagem' component={Listagem}
         options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;