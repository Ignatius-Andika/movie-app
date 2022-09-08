import React,{useState,useEffect} from 'react';
import './App.css';
import MovieBox from './MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar,Container,Nav,Form, FormControl,Button } from 'react-bootstrap';

const API_URL="https://api.themoviedb.org/3/movie/popular?api_key=8ddb3f862c90a55343605faa3fdc1bb7";
function App() {

  const [movies, setMovies]=useState([]);
  const [query, setQuery]=useState('');

  useEffect(() => {
    fetch(API_URL)
    .then((res)=>res.json())
    .then(data=>{
      console.log(data);
      setMovies(data.results);
    })
  }, [])


  const searchMovie = async(e)=>{
    e.preventDefault();
    console.log("Searching");
    try{
      const url=`https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
      const res= await fetch(url);
      const data= await res.json();
      console.log(data);
      setMovies(data.results);
    }
    catch(e){
      console.log(e);
    }
  }

  const changeHandler=(e)=>{
    setQuery(e.target.value);
  }
  return (
    <>
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <div style={{marginLeft:'5%'}}>          
          <img 
            src="https://res.cloudinary.com/dgcp0oaxq/image/upload/v1662606001/MovieApp/LogoMovies_r5cage.png"
            alt=""
            style={{width:'7%', margin:'-2% 1% 0px 2%'}}
          />
        <Navbar.Brand href="/home" style={{fontSize:'3vw'}}>MOVIE APP</Navbar.Brand>
        </div>
        <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="nabarScroll">
            <Nav 
            className="me-auto my-2 my-lg-3"
            style={{maxHeight:'100px'}}
            navbarScroll></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
              type="search"
              placeholder="Movie Search"
              className="me-2"
              aria-label="search"
              name="query"
              value={query} onChange={changeHandler}></FormControl>
              <Button variant="secondary" type="submit">Search</Button>
            </Form>
          </Navbar.Collapse>
      </Container>
    </Navbar>
    <div>
      {movies.length > 0 ?(
        <div className="container">
        <div className="grid">
          {movies.map((movieReq)=>
          <MovieBox key={movieReq.id} {...movieReq}/>)}
            </div>
    </div>
      ):(
        <div className='container'
          style={{
            marginTop: '10%',
            textAlign: 'center',
            verticalAlign: 'middle',
            borderRadius: '5px',
            height: '5em',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:'white'
          }}
        >
          <h1>MOVIES NOT FOUND</h1>
        </div>
      )}
    </div>   
    </>
   
  );
}

export default App;
