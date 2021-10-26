import { IGenre, IVideo } from './models';
import './Movie.css';
interface MovieProps {
    movie: IVideo;
    genre: IGenre
}

function Movie (props: MovieProps) {
    const { movie: { release_year, image_url, title, artist } } = props;

    return (
        <div className="movie">
            <img className="movie-image" alt="" src={image_url} />
            <div className="footer">
                <div className="movie-footer">
                    <div>{title}</div>
                    <div> {artist} </div>
                    <div>{release_year}</div>
                </div>
            </div>
        </div>
    );
}

export default Movie;