import app from './app';
import { connectDB } from './database';
import { Joke } from './models/joke';

(async () => {
  try {
    await connectDB();
    await Joke.sync({ force: false });
    console.log('Modelo de chistes sincronizado');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
})();
