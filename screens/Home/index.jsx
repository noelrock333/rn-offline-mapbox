import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const isConnected = useSelector(state => state.network.isConnected);
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a la Aplicación</Text>
      <Text style={styles.statusText}>
        Estado de conexión: {isConnected ? 'Conectado' : 'Desconectado'}
      </Text>
      <Button
        title="Ver Mapa"
        onPress={() => navigation.navigate('Map')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  statusText: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default Home;
