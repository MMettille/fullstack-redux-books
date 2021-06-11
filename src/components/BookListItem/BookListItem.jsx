import React from 'react';
import './BookListItem.css'
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Draggable} from "react-beautiful-dnd";
import { DragDropContext } from 'react-beautiful-dnd'

function BookListItem({book}){

    return(
        <Draggable 
            key={index}
            draggableId={index+''}
            index={index}>
                {(provided)=> (<div
                className="book-box"
                ref={provided.innerRef}
                {...provided.droppableProps} 
                {...provided.dragHandleProps}>
                    <section className="book-title-header">
                        <h5>Book Title</h5>
                    </section>
                    <section className="book-title">
                        <p>{book.title}</p>
                    </section>
                    <section className="book-delete-btn">
                        <button>
                            Delete
                        </button>
                    </section>
                    </div>
                )}
        </Draggable>
    )
}

export default BookListItem;
