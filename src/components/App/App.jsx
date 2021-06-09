import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';
import {useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {useDispatch} from 'react-redux';

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    getBooks();
  }, [])

  const getBooks = () => {
    Axios.get('/books')
    .then( response => {
      // this is where we have response.data
      // this is where we send data to redux (this week)
      dispatch({
        type: 'SET_BOOKS',
        payload: response.data
      })
    }).catch(err =>{
      console.log(err)
    })
  }

  return (
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm getBooks={getBooks}/>
        <BookList />
      </main>
    </div>
  );
}

export default App;