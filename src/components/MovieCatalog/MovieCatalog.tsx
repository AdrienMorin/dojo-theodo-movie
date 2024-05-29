import styles from "./MovieCatalog.module.css";

import GenreList from "../GenreList/GenreList";

import MoviePreview from "../MoviePreview/MoviePreview";
import { mockMovie } from "../../mock/mockMovie";
import { getMovies } from "../../services/movieService";
import { useInfiniteQuery } from "react-query";
import { useEffect } from "react";


export const MovieCatalog = () => {

  let nbPage = 1;

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["getPosts"],
    queryFn: ({ pageParam = nbPage }) => getMovies(pageParam),
  });

  useEffect(() => {
    // Fonction de gestionnaire d'événement pour le scroll
    const handleScroll = () => {
    if (window.scrollY + window.innerHeight >= document.body.offsetHeight){
        nbPage+=1;
        console.log("refresh")
        fetchNextPage(); 
      }
    };

    // Ajouter l'écouteur d'événement pour le scroll
    window.addEventListener('scroll', handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const movies = data?.pages[0] || []

  console.log("movies:", movies)

  return (
    <>
      <GenreList />
      <div className={styles.layout}></div>

      <div className={styles.mainContainer}>
        {isLoading && <p className={styles.isLoading}>Chargement...</p>}
        {!isLoading &&
          <div className={styles.moviesContainer}>
            {movies.map(movie =>
              <MoviePreview movie={movie}></MoviePreview>
            )} </div>
        }
      </div>


    </>
  );
};
