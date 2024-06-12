import { StaticImageData } from "next/image";

export interface ArtistsProps {
  name: String;
  img: String;
}

export interface SongProps {
  url: String;
  artist?: String;
  album?: String;
  name?: String | undefined;
  img?: String | undefined | StaticImageData;
  duration?: String | undefined;
  charts?: string[];
}

export interface AlbumProps {
  artist: String;
  name: String;
  artist_img?: String;
  img: String;
  songs?: String;
  year: String;
  duration?: String;
}

export interface DataSongProps {
  url: String;
  artist: String;
  name: String;
  img: StaticImageData;
  album?: String;
  views?: String;
  genre?: String[];
  duration?: String;
  charts?: string[];
  released?: string;
}

export interface CategoriesProps {
  color: String;
  img: String | StaticImageData;
  name: String;
}

export interface FeaturedChartsProps {
  img: String;
  artist: String;
  name: String;
  color: String;
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
