import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TextInput, Button } from 'react-native';
import axios from 'axios';

export default function App() {
  const [clima, setClima] = useState(null);
  const [pesquisa, setPesquisa] = useState('Recife');

  const buscarClima = () => {
    axios
      .get(`https://cors-anywhere.herokuapp.com/https://api.hgbrasil.com/weather?key=ba94c742&city_name=${pesquisa}`)
      .then(response => setClima(response.data.results))
      .catch(() => setClima(null));
  };

  useEffect(() => {
    buscarClima();
  }, []);

  if (!clima) return null;

  return (
    <ScrollView contentContainerStyle={estilos.container}>

      <View style={estilos.barraPesquisa}>
        <TextInput
          style={estilos.input}
          placeholder="Digite a cidade"
          placeholderTextColor="#ddd"
          value={pesquisa}
          onChangeText={setPesquisa}
        />
        <Button title="Buscar" onPress={buscarClima} color="#1e90ff" />
      </View>

      <Text style={estilos.cidade}>{clima.city_name}</Text>
      <Image
  source={{ uri: `https://assets.hgbrasil.com/weather/icons/${clima.condition_slug}.svg` }}
  style={estilos.imagem}
      />
      <Text style={estilos.temperatura}>{clima.temp}°C</Text>
      <Text style={estilos.descricao}>{clima.description}</Text>

      <View style={estilos.containerInfo}>
        <Text style={estilos.infoTexto}>Máx: {clima.forecast[0].max}°C</Text>
        <Text style={estilos.infoTexto}>Mín: {clima.forecast[0].min}°C</Text>
        <Text style={estilos.infoTexto}>Umidade: {clima.humidity}%</Text>
        <Text style={estilos.infoTexto}>Chuva: {clima.forecast[0].rain_probability || clima.rain}%</Text>
        <Text style={estilos.infoTexto}>Vento: {clima.wind_speedy}</Text>
      </View>

      <View style={estilos.containerInfo}>
        <Text style={estilos.infoTexto}>Nascer do Sol: {clima.sunrise}</Text>
        <Text style={estilos.infoTexto}>Pôr do Sol: {clima.sunset}</Text>
      </View>

      <View style={estilos.previsoesContainer}>
        <Text style={estilos.titulo}>Próximos dias</Text>
        {clima.forecast.map((dia, i) => (
          <Text key={i} style={estilos.previsaoItem}>
            {dia.weekday} {dia.date}: Máx {dia.max}°C / Mín {dia.min}°C - {dia.description}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const estilos = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#87ceeb',
    alignItems: 'center',
  },
  barraPesquisa: {
    flexDirection: 'row',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#ffffff30',
    borderRadius: 12,
    paddingHorizontal: 15,
    color: '#fff',
    width: '65%',
    height: 45,
    marginRight: 10,
  },
  cidade: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  imagem: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  temperatura: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  descricao: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  containerInfo: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
    alignItems: 'center',
  },
  infoTexto: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
    textAlign: 'center',
    fontWeight: '500',
  },
  previsoesContainer: {
    width: '85%',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 5,
    elevation: 4,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  previsaoItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 6,
    textAlign: 'center',
  },
});