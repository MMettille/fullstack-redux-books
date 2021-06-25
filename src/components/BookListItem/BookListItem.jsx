import React, {useState} from 'react';
import './BookListItem.css'
import {useDispatch, useSelector} from 'react-redux'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));


function BookListItem({book, getBooks}){

    const classes = useStyles();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false)
    const editBook = useSelector(store => store.bookToEdit)

    const handleClose = () => {
        setOpen(false)
    }
    
    const handleEdit = () => {
        console.log('Book to edit:', book)
        dispatch({type: 'SET_EDIT_BOOK', payload: book})
        setOpen(true);
    }

    const handleChange = (event) => {
        
        dispatch({ 
            type: 'EDIT_ONCHANGE', 
            payload: { property: 'title', value: event.target.value }
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // PUT REQUEST to /books/:id
        axios.put(`/books/${editBook.id}`, editBook)
        .then( response => {
            // clean up reducer data            
            dispatch({ type: 'EDIT_CLEAR' });
            setOpen(false);
            getBooks()
        })
        .catch(error => {
            console.log('error on PUT: ', error);
        })
    }

    return(
        <>
            <div className="book-box">
                <section className="book-title-header">
                    <h5>Book Title</h5>
                </section>
                <section className="book-title">
                    <p>{book.title}</p>
                </section>
                <section className="book-delete-btn">
                    <button onClick={handleEdit}>
                        Edit
                    </button>
                </section>
            </div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                <Fade in={open}>
                    <form onSubmit={handleSubmit}>
                        <div className="book-box">
                            <section className="book-title-header">
                                <h5>Book Title</h5>
                            </section>
                            <section className="book-title">
                                <input
                                    onChange={(event) => handleChange(event)}
                                    value={editBook.title}
                                />
                                <input type='submit' value='Update Book'/>
                            </section>
                            </div>
                        </form>
                     </Fade>
                   </Modal>
        </>
    )
}

export default BookListItem;