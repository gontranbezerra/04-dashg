import { createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';

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
    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i}`;
        },
        email() {
            return faker.internet.email().toLowerCase();
        },
        createdAt() {
            return faker.date.recent(10);
        },
      }),
    },
    seeds(server) {
        server.createList('user', 100)
    },
    routes() {
      this.namespace = 'api'; // todas as chamadas serão precedidas de /api/<route>
      this.timing = 750; // acrescenta um delay

      // this.get('/users');
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10} = request.queryParams;
        const total = schema.all('user').length;
        const pageStart = (Number(page) -1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const users = this.serialize(schema.all('user')).users.slice(pageStart, pageEnd);
        // console.log('makeServer.routes.get.users: ', users);

        return new Response(
          200,
          { 'x-total-count': String(total)},
          { users }
        )
      });
      this.get('users/:id');
      this.post('users');
      
      this.namespace = ''; // para resetar o namespace e não chocar com o api interna do Next.
      this.passthrough(); // caso a rota não tenha sido definida o miraje passa adiante pro Next.
    },
  });

  return server;
}
