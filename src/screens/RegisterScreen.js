import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const data = await register(phone);
      navigation.navigate('Login');
    } catch (err) {
      console.log(err); // Hata ayrıntılarını konsola yazdır
      setError(err.message || 'An error occurred');
    }
  };
  

  return (
    <View>
      <TextInput
        placeholder="Phone Number"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <Button title="Register" onPress={handleRegister} />
      {error ? <Text>{error}</Text> : null}
    </View>
  );
};

export default RegisterScreen;
