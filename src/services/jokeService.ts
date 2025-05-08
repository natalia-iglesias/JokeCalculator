import axios from 'axios';

const jokeService = {
  async fetchJoke(type?: string) {
    if (!type) {
      // Si no se especifica tipo, selecciona aleatoriamente entre "chuck" o "dad"
      type = Math.random() > 0.5 ? 'chuck' : 'dad';
    }

    try {
      if (type === 'chuck') {
        const res = await axios.get('https://api.chucknorris.io/jokes/random');
        return res.data.value;
      }

      if (type === 'dad') {
        const res = await axios.get('https://icanhazdadjoke.com/', {
          headers: { Accept: 'application/json' },
        });
        return res.data.joke;
      }

      // Si el tipo no es válido, arroja un error
      throw new Error('Tipo de chiste inválido. Usa "chuck" o "dad".');
    } catch (error: any) {
      throw new Error('Error al obtener el chiste: ' + error.message);
    }
  }
};

export default jokeService;
