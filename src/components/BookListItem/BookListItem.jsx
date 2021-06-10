import React from 'react';
import './BookListItem.css'

function BookListItem(book){
    return(
                <div className="book-box">
                    <section className="book-title-header">
                        <h5>Book Title</h5>
                    </section>
                    <section className="book-title">
                        <p>{book.title}</p>
                    </section>
                    <button>
                        Delete
                    </button>
                </div>
    )
}

export default BookListItem;