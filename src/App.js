import React, { useState,useEffect } from 'react'
import './App.css'



//APIs
const APIURL =
"https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";

const IMGPATH = "https://image.tmdb.org/t/p/w500/";

const App = () => {
const [user,setUser] = useState([]);
const [search , setSearch] = useState('');

  //getting the data  from the api

  const getUser = async () => {
  const response = await fetch(APIURL);
  const user = await response.json();
   setUser(user);
  
  }

//effects
 useEffect(()=> {
   getUser();
 },[]);

  return (
    <>
    <div className='App'>
      <input type='text'className='search' placeholder="..search" onChange={(e)=>setSearch(e.target.value)}/> 
    </div>
    <ul className='lists'>
       {user.results?.filter((val)=> {
         if(search===""){
          return val
        }else if(val.title.toLowerCase().includes(search.toLowerCase())){
          return val
        }
       })?.map(({id,title,poster_path,vote_average,overview,vote_count})=> {

        return (
           <li key={id}className='list'>
              <img src={ IMGPATH + poster_path} alt={title}/>
              <h4 className='title'>{title}</h4>
              <p className='overview'>{overview}</p>
              <div className='rate'>
              <p className='vote'>{vote_average}</p>
              <p className='vote'>{vote_count}</p>
              </div>
           </li>
         )
       })}    
    </ul>
 </>
  )
}

export default App



     