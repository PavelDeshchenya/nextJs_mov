export interface IGenreMovieCard {
  id: number;
  name: string;
}

export interface IMovieCards {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface IMoviesCardProps {
  moviesProp: IMovieCards[];
  genresProp: IGenreMovieCard[];
}

interface IGenres {
  id: number;
  name: string;
}

interface IVideoMovie {
  key: string;
  type: string;
}
interface IVideoRes {
  results: IVideoMovie[];
}
interface IProdComp {
  name: string;
  logo_path: string | null;
  id: number;
}
export interface IMovieCard {
  videos: IVideoRes;
  id: number;
  poster_path: string;
  release_date: string;
  runtime: number;
  title: string;
  vote_average: number;
  vote_count: number;
  original_title: string;
  budget: number;
  genres: IGenres[];
  revenue: number;
  overview: string;
  production_companies: IProdComp[];
}

export interface PaginationProps {
  pagesCount: number;
  onPageChange: (page: number) => void;
  currentPage: number;
}

export interface IFilters {
  years: string[];
  genresInSelect: string[];
  valueFrom: string | number;
  valueTo: string | number;
}

export interface IModalButtonProps {
  children: React.ReactNode;
  handleclick: () => void;
}

export interface IModalWindow {
  moviesProp: IMovieCards | IMovieCard;
  title: string;
}

export interface IRates {
  [cardId: number]: number | undefined;
}

export interface IGenreSearch {
  genres: IGenreMovieCard[];
  onGenreSelect: (selectedGenres: string[]) => void;
  selectedGenres: string[];
}
