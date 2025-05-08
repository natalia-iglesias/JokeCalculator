import axios from 'axios';

const jokeService = {
  async fetchJoke(type?: string) {
    if (!type) {
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

      throw new Error('Tipo de chiste inválido. Usa "chuck" o "dad".');
    } catch (error: any) {
      throw new Error('Error al obtener el chiste: ' + error.message);
    }
  }
};

export default jokeService;
