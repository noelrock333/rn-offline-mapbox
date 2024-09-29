import { configureStore } from '@reduxjs/toolkit';
import { reducer as network } from 'react-native-offline';

// Importa tus slices aquí
// import tuSlice from './tuSlice';

const store = configureStore({
  reducer: {
    network,
    // Agrega tus slices aquí
    // tuReducer: tuSlice.reducer,
  },
});

export default store;
