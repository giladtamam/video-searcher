import Movie from './Movie';
import { Tag } from "react-tag-input";
import { useEffect, useState } from 'react';
import { fetchVideosAPI } from './api';
import { IVideo, IGenre, IGenres } from './models';
import VideoReactTags from './VideoReactTags';
import { useCallback } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import './App.css';

function App() {
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<IVideo[]>([]);
  const [genres, setGenres] = useState<IGenres>({});
  const [tags, setTags] = useState<Tag[]>([]);
  const [suggestions, setSuggestions] = useState<Tag[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [year, setYear] = useState('Year');
  const [years, setYears] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      const { genresMap, videos: newVideos, genres, years, error } = await fetchVideosAPI();
      setIsLoading(false);
      if (error) {
        setErrorMessage('Something went worng, please try again')
      }
      setVideos(newVideos);
      setGenres(genresMap);
      const suggests = genres.map((genre: IGenre) => ({
          id: `${genre.id}`,
          text: genre.name
      }));
      setSuggestions(suggests);
      setYears(years);
    }
    fetchVideos();
  }, []);
  
  useEffect(() => {
    let filtered = tags.length === 0 ? videos 
      : videos.filter(movie => {
          genres[movie.genre_id] = genres[movie.genre_id] || 'NoGener';
          return tags.some(tag => tag.text === genres[movie.genre_id].name);
        });

    filtered = year !== 'Year'
      ? filtered.filter((m: IVideo) => `${m.release_year}` === year)
      : filtered;
    filtered = searchTerm
      ? filtered.filter(({title = ''}) =>
        `${title}`.toLowerCase().includes(searchTerm.toLowerCase())
      ) : filtered;
    setFilteredVideos(filtered);
  }, [tags, videos, year, genres, searchTerm]);

  const onTagDeleted = useCallback((i: number) => {
    setTags(tags.filter((tag, index) => index !== i));
  }, [tags]);

  const onTagAdded = useCallback((tag: Tag) => {
    setTags([...tags, tag]);
  }, [tags]);

  const onYearChange = useCallback((event) => {
    setYear(event.target.value);
  }, []);
  
  const onSearchChange = useCallback((event) => {
    const { value } = event.target;
    setSearchTerm(value);
  }, []);

  return (
    <div className="App">
      <h1>Video Searcher</h1>
      <main className="main-app">
        { errorMessage && <Alert severity="error">{ errorMessage }</Alert>}
        <div className="app-header">
          <TextField
            style={{marginRight: 10}}
            onChange={onSearchChange}
            value={searchTerm}
            label="Search video..."
            variant="outlined" />
          {!isLoading && <Select
            className="video-select"
            value={year}
            label="Year"
            onChange={onYearChange}>
            { years.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
          </Select>}
          <VideoReactTags 
            suggestions={suggestions}
            tags={tags}
            deleteTag={onTagDeleted}
            addTag={onTagAdded}/>
        </div>
        { (!isLoading && filteredVideos.length === 0) && <Alert severity="info">No videos found!</Alert> }
        { isLoading ? <div className="loader"><CircularProgress /></div> : (
          <div className="movie-list">
              {filteredVideos.map((movie: IVideo) => {
                return <Movie movie={movie} genre={genres[`${movie.genre_id}`]} key={movie.id}/>
              })}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
