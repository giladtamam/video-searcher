import { IGenre, IGenres, IVideo } from "./models";
import axios from 'axios';

interface IResponse {
  genres: IGenre[];
  videos: IVideo[];
  genresMap: IGenres;
  years: string[];
  error?: boolean;
}
export async function fetchVideosAPI(): Promise<IResponse> {
  try {
    const { data } = await axios.get<IResponse>(
      'https://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json',
    );

    const { genres, videos } = data;
    const genresMap = genres.reduce((acc: IGenres, genre: IGenre) => ({
      ...acc,
      [`${genre.id}`]: genre
    }), {});

    let minYear = Math.min(...videos.map((video: IVideo) => video.release_year))
    const years = Array.from(new Array(2022 - minYear), () => `${minYear++}`);
    years.push('Year');
    return { genres, videos, genresMap, years: years.reverse()}
  } catch(e) {
    return { genres: [], videos: [], genresMap: {}, years: [], error: true };
  }
}
