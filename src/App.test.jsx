import renderer from 'react-test-renderer';
import App from './App';
import axios from 'axios';
import Movie from './Movie';

jest.mock("axios");

describe("fetchUsers", () => {
  let component;
  test('axios.get called on mount', async () => {
    axios.get.mockResolvedValueOnce({
        data: {
          videos: [{
            id: 1,
            artist: 'artist',
            title: 'title',
            release_year: 2020,
            genre_id: 1,
            image_url: 'image_url'
          },
          {
            id: 2,
            artist: 'artist2',
            title: 'title2',
            release_year: 2021,
            genre_id: 1,
            image_url: 'image_url2'
          }],
          genres: [{
            id: 1,
            name: 'Genres1'
          }]
        }
    });
    renderer.act(() => {
      component = renderer.create(<App />);
    });

    expect(axios.get).toBeCalledTimes(1);
  });

  test('test search 1 results', () => {
    axios.get.mockResolvedValueOnce({
      data: {
        videos: [{
          id: 1,
          artist: 'artist',
          title: 'title',
          release_year: 2020,
          genre_id: 1,
          image_url: 'image_url'
        },
        {
          id: 2,
          artist: 'artist2',
          title: 'title2',
          release_year: 2021,
          genre_id: 1,
          image_url: 'image_url2'
        }],
        genres: [{
          id: 1,
          name: 'Genres1'
        }]
      }
  });
    renderer.act(async () => {
      component = renderer.create(<App />);
    });

    renderer.act(() => {
      component.root.findByProps({ label: 'Search video...' })
          .props.onChange({ target: { value: 'Yes' } });
    });

    renderer.act(async () => {
      const movies = component.root.findByType(Movie);
      expect(movies.length).toBe(0);
    });
  });
});
