import express from 'express';
import { importSchema } from 'graphql-import';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import resolvers from './graphql/resolvers';
import path from 'path';

const app = express();

// Allow cross-origin
app.use(cors());

const typeDefs = importSchema('graphql/schema.graphql');
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
