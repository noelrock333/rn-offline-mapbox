import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CameraView, Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { openDatabaseSync } from 'expo-sqlite';

const db = openDatabaseSync('photos.db');

const TakePhotos = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState('back');
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      const permission = cameraPermission?.status === 'granted' && mediaLibraryPermission?.status === 'granted';
      setHasPermission(permission);
      
      db.withTransactionAsync(async () => {
        const result = await db.execAsync(
          'CREATE TABLE IF NOT EXISTS photos (id INTEGER PRIMARY KEY AUTOINCREMENT, path TEXT)'
        );
        console.log('Create table if not exists:', result);
      });
      db.withExclusiveTransactionAsync(async () => {
        const result = await db.getAllAsync('SELECT * FROM photos');
        console.log('Get all photos:', result);
      });
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      
      if (asset?.uri) {
        console.log('Foto uri:', asset?.uri);
        db.withTransactionAsync(async () => {
          const result = await db.runAsync('INSERT INTO photos (path) VALUES (?)', [asset?.uri]);
          console.log('Foto guardada:', result);
        });
      } else {
        console.log('No se pudo guardar la foto');
      }
    }
  };

  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>No hay acceso a la cámara</Text>;
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} type={type} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Tomar Foto</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
  },
});

export default TakePhotos;
