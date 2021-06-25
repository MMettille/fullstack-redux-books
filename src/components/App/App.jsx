import BookList from '../BookList/BookList';
import BookForm from '../BookForm/BookForm';
import {useEffect} from 'react';
import './App.css';
import Axios from 'axios';
import {useDispatch} from 'react-redux';
import '@fontsource/roboto';
import { createMuiTheme, ThemeProvider} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#76d275',
      main: '#43a047',
      dark: '#00701a',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5ddef4',
      main: '#00acc1',
      dark: '#007c91',
      contrastText: '#000',
    },
  },
});

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
    <ThemeProvider theme={theme}>
    <div className="App">
      <header><h1>Books w/ Redux!</h1></header>
      <main>
        <BookForm getBooks={getBooks}/>
        <BookList getBooks={getBooks}/>
      </main>
    </div>
    </ThemeProvider>
  );
}

export default App;