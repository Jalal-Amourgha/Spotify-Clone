export interface ArtistsProps {
  name: any;
  img: String;
}

export interface SongProps {
  url: String;
  artist?: String;
  album?: String;
  name?: any;
  img?: String | undefined;
  duration?: String | undefined;
  charts?: string[];
}

export interface AlbumProps {
  artist: String;
  name: any;
  artist_img?: String;
  img: String;
  songs?: String;
  year: String;
  duration?: String;
}

export interface DataSongProps {
  url: String;
  artist: any;
  name: String;
  img: string;
  album?: String;
  views?: String;
  genre?: String[];
  duration?: String;
  charts?: string[];
  released?: string;
}

export interface CategoriesProps {
  color: String;
  img: String;
  name: String;
}

export interface FeaturedChartsProps {
  img: String;
  artist: String;
  name: any;
  color: String;
  country: any;
}
export interface PlaylistProps {
  name: String;
  description: String;
  id: String;
  songs: [];
}

export interface DataProps {
  artists: ArtistsProps[];
  albums: AlbumProps[];
  categories: CategoriesProps[];
  data: DataSongProps[];
  featuredCharts: FeaturedChartsProps[];
}
