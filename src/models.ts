export interface IGenreSuggestion {
    id: string;
    text: string;
}

export interface IVideo {
    id: number;
    artist: string;
    title: string;
    release_year: number;
    genre_id: number;
    image_url: string;
}
  
export interface IGenre {
    id: number;
    name: string;
}

export interface IGenres {
    [key: string]: IGenre
}