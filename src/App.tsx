import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import './styles/global.scss';
import { useState } from 'react';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

export function App() {

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({}as GenreResponseProps);

  //para que os dois componentes filhos recebam a mesma informação, então criamos uma função no componente pai
  //a função identifica qual genero está selecionado ao clicar no button
  function handleClickButton(genre: GenreResponseProps) {
    setSelectedGenre(genre);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
    {/* Aqui passamos o parâmetro dentro do componente
    O parâmetro passado no Sidebar, precisa estar tipado no arquivo Sidebar.tsx
     */}
    <SideBar handleGenreChange={handleClickButton}/>
    <Content genre={selectedGenre}/>
    </div>   
  )
}
