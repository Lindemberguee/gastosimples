const Fastify = require("fastify");

const app = Fastify({ logger: true });

app.get("/ping", (req, reply) => {
  reply.send({ pong: true });
});

app.listen({ port: 4001, host: "0.0.0.0" }, () => {
  console.log("🔥 Servidor simples rodando na porta 4001");
});
