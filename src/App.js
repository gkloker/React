import React, {Fragment, useState, useEffect} from 'react';
import Header from "./components/Header";
import Formulario from "./components/Formulario";
import NewsList from "./components/NewsList";

function App() {

  // definir la categoria y noticias
  const [category, setCategory] = useState('');
  const [news, setNews] = useState([]);

  useEffect(() => {
    const consultAPI = async () => {
      const url = `http://newsapi.org/v2/top-headlines?country=ar&category=${category}&apiKey=3058a749a28245a59ad54dacf4229381`;

      const result = await fetch(url);
      const news = await result.json();

      setNews(news.articles);
    }
    consultAPI();
  }, [category])

  return (
    <Fragment>
      <Header
        tittle="Buscador de Noticias"
      />

      <div className="container white">
        <Formulario
          setCategory={setCategory}
        />

        <NewsList
          news={news}
        />
      </div>
    </Fragment>
  );
}

export default App;
