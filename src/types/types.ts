interface IGenreMovieCard {
  id: number;
  name: string;
}

interface IMovieCards {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface IMoviesCardProps {
  results: IMovieCards[];
  genres: IGenreMovieCard[];
}
export interface IMovieCard {
  id: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
}
