import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';

const gf = new GiphyFetch('Zvet6aybZ1F2tuRPbe7n6ofe01X2iKaT');
//const fetchGifs = (offset: number) => {
//  return gf.trending({ offset, limit: 10 });
//}

const fetchGifs = (offset: number) => {
  return gf.search("cars", { sort: "recent" });
}


const fetchCategs = async () => {
  try {
    const result = await gf.categories();
    console.log('categories are:', result);
  } catch(error) {
    console.log(error);
  }
}


const devicewidth = window.innerWidth;




const App = () => {

    const [search, setSearch] = useState('');
    //const [query, setQuery] = useState('');
    let query = '';

    

    useEffect(() => {
        getGifs();
    },[search]);

    const getGifs = (offset:number) => {
        if(search == '') {
            return gf.trending({ offset, limit: 10 })
        }
            else if (search !== '') {
                return gf.search(search, { sort: "recent"})
                }
            }
    
    const updateSearch = (e) => {
        setSearch(e.target.value);
        console.log(search);
    }

    const getSearch = (e) => {
        e.preventDefault();
        console.log(search)
        //setQuery(search);
        query = search;
        setSearch('');
        getGifs();
        console.log('Form submitted!')
    }

        


    return (
        <>
        <form onSubmit={getSearch}
              className="search-form"
        >
            <input className="search-bar"
                   type="text"
                   value={search}
                   onChange={updateSearch}
                   />
            <button
                className="search-button"
                type="submit"
                onClick={updateSearch}
            >
                Search
            </button>

        </form>
        <Grid className='back-check'
                      width={devicewidth} 
                      columns={5} 
                      fetchGifs={getGifs} 
                      gutter={10}
                      />
        </>
    )
}

export default App;