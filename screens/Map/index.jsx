import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';

Mapbox.setAccessToken(process.env.MAPBOX_ACCESS_TOKEN);

const Map = () => {
  return (
    <View style={styles.container}>
      <Mapbox.MapView style={styles.map}>
        <Mapbox.Camera
          zoomLevel={14}
          centerCoordinate={[-74.006, 40.7128]} // Coordenadas de Nueva York, ajusta según tus necesidades
        />
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default Map;
