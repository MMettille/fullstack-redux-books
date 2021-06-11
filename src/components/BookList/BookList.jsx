import {useSelector} from 'react-redux'
import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'

import Box from '@material-ui/core/Box';

function BookList() {
  const bookList = useSelector(store => store.bookList);

  return (
    <div>
      <section>
        <h3>All Books</h3>
      </section>
      <div className="book-container">
        <Box 
          display="flex"
          flexWrap="wrap"
          p={2}
          m={2}
        >
          {bookList.map((book, index) => {
            return <BookListItem key={index} book={book} />  
          })}
        </Box>
      </div>
    </div>
  );
}

export default BookList;