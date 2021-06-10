import {useSelector} from 'react-redux'
import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'

function BookList() {
  const bookList = useSelector(store => store.bookList);

  return (
    <div>
      <section>
        <h3>All Books</h3>
      </section>
      <div className="book-container">
          {bookList.map((book, index) => {
            return <BookListItem key={index} book={book} />  
          })}
      </div>
    </div>
  );
}

export default BookList;