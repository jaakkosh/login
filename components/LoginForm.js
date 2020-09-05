import React, {useContext} from 'react';
import {
  View,
  Button,
} from 'react-native';
import PropTypes from 'prop-types';
import {AuthContext} from '../contexts/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import { postLogin, checkToken } from '../hooks/APIhooks';
import FormTextInput from './FormTextInput';
import useLoginForm from '../hooks/loginHooks';

const LoginForm = ({navigation}) => {
    const [isLoggedIn, setIsLoggedIn] = useContext(AuthContext);

    const doLogin = async () => {
        try{
          
          const userData = await postLogin(inputs);
          console.log('user login success', userData)
          setIsLoggedIn(true);
          await AsyncStorage.setItem('userToken', userData.token);
          navigation.navigate('Home');
        }
        catch(e){
          console.log(e.message)
          }
        }

    const {handleInputChange, inputs} = useLoginForm();

    return (
    <View>
      <FormTextInput
        autoCapitalize="none"
        placeholder="username"
        onChangeText={(txt) => handleInputChange('username', txt)}
      />
      <FormTextInput
        autoCapitalize="none"
        placeholder="password"
        onChangeText={(txt) => handleInputChange('password', txt)}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={doLogin}/>
    </View>
    );
};

LoginForm.propTypes ={
    navigation: PropTypes.object,
};

export default LoginForm;