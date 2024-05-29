import { Movie } from "../../models";
import styles from "./MoviePreview.module.css";
import { POSTER_URL_PREFIX } from "../../App";

const MoviePreview = ({ movie }: { movie: Movie }) => {
  const goToMovieDetails = () => {
    // A DEFINIR EXPERT
  };

  console.log("Note: "+Math.floor(movie.vote_average/2))

  return <div className={styles.movieCard} onClick={goToMovieDetails}>
    <img className={styles.moviePreviewImg} src={POSTER_URL_PREFIX + movie.poster_path} />
    <div className={styles.movieInfos}>
      <div className={styles.movieTitleDiv}><h1 className={styles.movieTitleH1}>{movie.title}</h1></div>
      <div className={styles.movieVote}>
        {[...Array(5)].map((_, index) => (
        <span className={`${styles.quizzItem} ${
          index < Math.floor(movie.vote_average/2) ? styles.yellowStar : styles.whiteStar
        }`}>★</span>
      ))}
      </div>
    </div>
      
  </div>;
};

export default MoviePreview;
