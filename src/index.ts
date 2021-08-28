import 'reflect-metadata';
import express from 'express';
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import cookieParser from "cookie-parser";

import { UserResolver } from "./resolvers/user";
import { createConnection } from "typeorm";

(async () => {
  const app = express();
  app.use(cookieParser());
  app.get('/', (_req, res) => res.send('hello'))

  await createConnection()

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({req, res}) => ({req, res})
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({app});

  app.listen(4000, () => {
    console.log('Server started');
  });
})();