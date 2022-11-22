import React from 'react';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';

// let server = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: []
    }
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  getBooks = async () => {
    try{
      let results = await axios.get(`${process.env.REACT_APP_SERVER}/books`);
      this.setState({
        books: results.data
      });
    } catch (error){
      console.log(error.response.data);
    }
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */
    // Carousel constructor
    let carouselItems = this.state.books.map( book => {
      return (
        <Carousel.Item>
          <p>{book.title}</p>
          <p>{book.description}</p>
          <p>{book.status}</p>
        </Carousel.Item>
      )
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Carousel>
            {carouselItems}
          </Carousel>
        ) : (
          <h3>No Books Found :(</h3>
        )}
      </>
    )
  }
}

export default BestBooks;
