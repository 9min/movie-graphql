import { getMovies, getMovie, getSuggestions } from './db';

const resolvers = {
  Query: {
    movies: (_, {limit, minimum_rating}) => getMovies(limit, minimum_rating),
    movie: (_, {movie_id}) => getMovie(movie_id),
    suggestions: (_, {movie_id}) => getSuggestions(movie_id),
  },
};

export default resolvers;
