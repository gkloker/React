import React, {useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import ListImages from "./components/ListImages";

function App() {

  // state de la App
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalpage, setTotalpage] = useState(5);

  useEffect(() => {
    const consultAPI = async () => {
      if(search === '') return;

      const cantImagePage = 30;
      const key = "17476031-41ab14d4d1084eb8ceb536ae7";
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${cantImagePage}&page=${page}`;

      const request = await fetch(url);
      const result = await request.json();

      setImages(result.hits);

      // calcular el total de paginas
      const calcTotalPages = Math.ceil(result.totalHits / cantImagePage);
      setTotalpage(calcTotalPages);

      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'});
    }
    consultAPI();

  }, [search, page])

  // definir la pagina anterior
   const previousPage = () => {
    const newPage = page - 1;

    if (newPage === 0) return;

    setPage(newPage);
   }

   // definir la pagina siguiente
   const nextPage = () => {
    const newPage = page + 1;

    if(newPage > totalpage) return;

    setPage(newPage);
   }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Search Images</p>

        <Formulario
          setSearch={setSearch}
        />
      </div>

      <div className="row justify-content-center">
        <ListImages
          images={images}
        />

        {(page === 1) ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={previousPage}
          >
            &laquo;  Anterior
          </button>
        )}

        {(page === totalpage) ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={nextPage}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
