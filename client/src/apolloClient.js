import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  // uri: 'https://movieql-osezlvyqsg.now.sh',
  uri: '/graphql',
});

export default client;