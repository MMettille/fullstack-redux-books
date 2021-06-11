import {useSelector} from 'react-redux'
import BookListItem from '../BookListItem/BookListItem'
import './BookList.css'

import { DragDropContext } from 'react-beautiful-dnd'
import { Droppable } from "react-beautiful-dnd";

import Box from '@material-ui/core/Box';

function BookList() {
  const bookList = useSelector(store => store.bookList);

  // This is responsible for updating the positon of the thing that moved.
  // Will need to update this with a reducer?
  // Then send this to the database for storing?
  const onDragEnd = result => {
    const {destination, source, reason} = result;

    // If the draggable item has no valid drop, it is canceled
    if(!destination || reason === 'CANCEL'){
      return;
    }

    // If the draggable item is placed in the same area, it is again, returned/no update
    if(destination.droppableId === source.droppableId && destination.index === source.index){
      return;
    }

    const bookList = Object.assign([],this.state.bookList);
    const droppedBook = this.state.bookList[source.index]


    bookList.splice(source.index,1); // [1,2,3,4] - > If you move three, this will delete three from the array // returns [1,2,4]
    bookList.splice(destination.index, 0, droppedBook) // This will drop the book where you want -> [droppedBook, 1,2,4]

    this.setState({
      bookList
    })
  }

  return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <section>
        <h3>All Books</h3>
      </section>
      <Droppable droppableId='dp1'>
        {(provided)=> (<div
        className="book-container"
        ref={provided.innerRef}
        {...provided.droppableProps} >
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
        </div> )}
      </Droppable>
      </DragDropContext>
  );
}

export default BookList;
