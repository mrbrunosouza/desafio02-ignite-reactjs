import React, { useEffect, useState } from "react";

import { api } from "../services/api";
import { Button } from "./Button";

import '../styles/sidebar.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

//Tipamos handleGenreChange como uma function 'vazia' 
//somente para receber os dados depois
interface SidebarProps {
  handleGenreChange: (genre: GenreResponseProps) => void;
}

export function SideBar(props: SidebarProps) {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
      handleClickButton(response.data[0])
    });
  }, []);

  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenreId(genre.id);
    if(props.handleGenreChange) {
      props.handleGenreChange(genre)
    }
  }
  return (
    <>
    <nav className="sidebar">
      <span>Watch<p>Me</p></span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
    </>
    
  )
}