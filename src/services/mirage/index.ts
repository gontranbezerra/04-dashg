import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    routes() {
      this.namespace = 'api'; // todas as chamadas serão precedidas de /api/<route>
      this.timing = 750; // acrescenta um delay

      this.get('/users');
      this.post('users');

      this.namespace = ''; // para resetar o namespace e não chocar com o api interna do Next.
      this.passthrough(); // caso a rota não tenha sido definida o miraje passa adiante pro Next.
    },
  });

  return server;
}
