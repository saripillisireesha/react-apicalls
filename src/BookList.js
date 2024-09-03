import axios from "axios"
import React, { useEffect, useState } from "react"
const BookList=()=>{
    const[allBooks, setAllBooks]=useState([])
    const[message, setMessage]=useState('')
    useEffect(() => {
        const fetchBooks = async () => {
          try {
            const response = await axios.get('http://localhost:9093/books');
            console.log(response.data);
            setAllBooks(response.data); // Set the fetched data to state
            setMessage('Books fetched successfully!');
          } catch (error) {
            console.error('Error fetching books:', error);
            setMessage('Failed to fetch books. Please try again later.');
          }
        };
    
        fetchBooks();
      }, []);

    return(
        <>
        <h1>Book List</h1>
        {message && <p style={{ color: message.includes('Failed') ? 'red' : 'green' }}>{message}</p>}

        <ol>
            {allBooks.map(book=>
            <li key={book.id}>
                <strong>Title:</strong>{book.title}<br/>
                <strong>Price:</strong>{book.price}<br/>
                <strong>Publish Date:</strong>{book.pubDate}<br/>

            </li>
            )}
        </ol>
        


        </>

    );


}
export default BookList