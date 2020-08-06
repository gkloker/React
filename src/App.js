import React, {Fragment, useState, useEffect} from 'react';
import Formulario from "./components/Formulario";
import Cancion from "./components/Cancion";
import Info from "./components/Info";
import axios from "axios";

function App() {

  // definir el state
  // const [searchLyric, setSearchLyric] = useState({});
  const [lyric, setLyric] = useState('');
  const [info, setInfo] = useState({});

  // useEffect(() => {
  //   // comprobamos si el objeto esta vacio
  //   if(Object.keys(searchLyric).length === 0) return;
  //
  //   const consultApi = async () => {
  //     const {artist, song} = searchLyric;
  //     const urlSong = `https://api.lyrics.ovh/v1/${artist}/${song}`;
  //     const urlInfo = `https://www.theaudiodb.com/api/v1/json/1/search.php?s=${artist}`;
  //
  //     const [lyric, info] = await Promise.all([
  //       axios(urlSong),
  //       axios(urlInfo)
  //     ]);
  //
  //     setLyric(lyric.data.lyrics);
  //     setInfo(info.data.artists[0]);
  //   }
  //   consultApi();
  // },[searchLyric, info])

  return (
    <Fragment>
      <Formulario
        // setSearchLyric={setSearchLyric}
        getLyrics={setLyric}
        getInfo={setInfo}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <Info
              info={info}
            />
          </div>
          <div className="col-md-6">
            <Cancion
              lyric={lyric}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
