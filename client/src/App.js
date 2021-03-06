import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import Cards from './components/cards/Cards';

function App() {
  const [values, setValues] = useState();
  const [listGames, setListGames] = useState();

  const handleChangeValues = (value) => {
    setValues((listValues) => ({
      ...listValues,
      [value.target.name]: value.target.value,
    }))
  }

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      name: values.name,
      cost: values.cost,
      category: values.category,
      image: values.image
    }).then(response => {
      console.log(response);
    }).catch(err => {
      console.log(err.response);
    })
  }

  useEffect( () => {
    Axios.get("http://localhost:3001/getCards")
    .then( (response) => {
        setListGames(response.data)
    })
  }, [listGames]) 

  return (
    <div className="app--container">
      <div className='box--left'>
        <div className='register--container'>
          <h1 className='title'>Shop Games</h1>
          <input type='text' className='register--input' name='name' placeholder='Nome' onChange={handleChangeValues}></input>
          <input type='text' className='register--input' name='image' placeholder='Link da imagem' onChange={handleChangeValues}></input>
          <input type='text' className='register--input' name='cost' placeholder='Preço' onChange={handleChangeValues}></input>
          <input type='text' className='register--input' name='category' placeholder='Categoria' onChange={handleChangeValues}></input>
          <button className='register--button' onClick={handleClickButton}>Cadastrar</button>
          <span className='gitHub'>&copy;EmersonSousa15</span>
        </div>
        </div>
      <div className='cards--container'>
        {typeof listGames !== "undefined" &&
        listGames.map((game) => {
          return <Cards 
          key={game.idGame} 
          listCard={listGames} 
          setListGames={setListGames}
          id={game.idGame}
          name={game.name}
          cost={game.cost}
          category={game.category}
          image={game.image}
          />
        })}
      </div>

    </div>
  );
}

export default App;
