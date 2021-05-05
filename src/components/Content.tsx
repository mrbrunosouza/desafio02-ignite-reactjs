import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

import '../styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface ContentProps {
  genre: GenreResponseProps
}

//aqui importamos o genre do App.tsx pelo props,
//que veio da propriedade do componente.
//então sabemos o genre que está selecionado e então exibimos a lista
//desse genre na tela
export function Content(props: ContentProps) {

  const [movies, setMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${props.genre.id}`).then(response => {
      setMovies(response.data);
    });
  }, [props]);

  return (
    <div className="container">
    <header>
      {/* Aqui usamos o props.nomeDoObjeto.propriedade */}
      <span className="category">Categoria:<span> {props.genre.title}</span></span>
    </header>

    <main>
      <div className="movies-list">
        {movies.map(movie => (
          <MovieCard
            key ={movie.imdbID} 
            title={movie.Title} 
            poster={movie.Poster} 
            runtime={movie.Runtime} 
            rating={movie.Ratings[0].Value} 
          />
        ))}
      </div>
    </main>
    </div>
  )
}





