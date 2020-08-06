import React, {useState} from "react";
import axios from "axios";

const Formulario = ({getLyrics, getInfo}) => {

  const [search, setSearch] = useState({
    artist: '',
    song: ''
  });

  const [error, setError] = useState(false)

  const {artist, song} = search;

  // funcion para leer el contenido
  const updateState = e => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  // consultar las apis
  const searchInfo = async e => {
    e.preventDefault();

    if (artist.trim() === '' || song.trim() === '') {
      setError(true);
      return;
    }
    setError(false);

    // pasar al componente principal
    // setSearchLyric(search);

      const consultApi = async () => {
        const {artist, song} = search;
        const urlSong = `https://api.lyrics.ovh/v1/${artist}/${song}`;
        const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;

        const [lyric, info] = await Promise.all([
          axios(urlSong),
          axios(urlInfo)
        ]);

        getLyrics(lyric.data.lyrics);
        getInfo(info.data.artists[0]);
      }
      await consultApi();
  }

  return (
    <div className="bg-info">
      <div className="container">
        <div className="row">
          <form
              onSubmit={searchInfo}
              className="col card text-white bg-transparent mb-2 pt-5 pb-2">
            <fieldset>
              <legend className="text-center">Buscador Letras Canciones</legend>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Artista</label>
                    <input
                      type="text"
                      className="form-control"
                      name="artist"
                      placeholder="Nombre Artista"
                      onChange={updateState}
                      value={artist}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Cancion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="song"
                      placeholder="Nombre Cancion"
                      onChange={updateState}
                      value={song}
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-primary float-right"
              >Buscar</button>
            </fieldset>
          </form>
        </div>

        {error ?
          <p className="alert alert-danger text-center p-2 m-2">
            Todos los campos son obligatorios
          </p> :
          null
        }
      </div>
    </div>
  );
}

export default Formulario;