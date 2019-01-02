// test: http://localhost:5000/graphql

const axios = require('axios');

const BASE_URL = 'https://yts.am/api/v2/';
const LIST_MOVIES_URL = `${BASE_URL}list_movies.json`;
const MOVIE_DETAILS_URL = `${BASE_URL}movie_details.json`;
const MOVIE_SUGGESIONS_URL = `${BASE_URL}movie_suggestions.json`;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    summary: { type: GraphQLString },
    language: { type: GraphQLString },
    genres: { type: new GraphQLList(GraphQLString) },
    description_full:  { type: GraphQLString },
    medium_cover_image:  { type: GraphQLString },
  }),
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    movies: {
      type: new GraphQLList(MovieType),
      args: {
        limit: { type: GraphQLInt },
        minimum_rating: { type: GraphQLFloat },
      },
      resolve(parent, args) {
        const { limit, minimum_rating } = args;
        let listMoviesURL = LIST_MOVIES_URL;
        
        if (limit && minimum_rating) {
          listMoviesURL = `${listMoviesURL}?limit=${limit}&minimum_rating=${minimum_rating}`;
        } else {
          if (limit) {
            listMoviesURL = `${listMoviesURL}?limit=${limit}`;
          }
          if (minimum_rating) {
            listMoviesURL = `${listMoviesURL}?minimum_rating=${minimum_rating}`;
          }
        }

        return axios.get(listMoviesURL)
          .then((res) => {
            const {
              data: {
                data: {
                  movies
                }
              }
            } = res;
            return movies;
          });
      },
    },
    movie: {
      type: MovieType,
      args: {
        movie_id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const { movie_id } = args;
        let movieDetailsUrl = MOVIE_DETAILS_URL;
        
        if (movie_id) {
          movieDetailsUrl = `${MOVIE_DETAILS_URL}?movie_id=${movie_id}`;
        }

        return axios.get(movieDetailsUrl)
          .then((res) => {
            const {
              data: {
                data: {
                  movie
                }
              }
            } = res;
            return movie;
          });
      },
    },
    suggestions: {
      type: new GraphQLList(MovieType),
      args: {
        movie_id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        const { movie_id } = args;
        let movieSuggesionsUrl = MOVIE_SUGGESIONS_URL;
        
        if (movie_id) {
          movieSuggesionsUrl = `${MOVIE_SUGGESIONS_URL}?movie_id=${movie_id}`;
        }

        return axios.get(movieSuggesionsUrl)
          .then((res) => {
            const {
              data: {
                data: {
                  movies
                }
              }
            } = res;
            return movies;
          });
      },
    },
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
