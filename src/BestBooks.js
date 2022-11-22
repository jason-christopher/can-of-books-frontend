import React from 'react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import { Button, Modal, Form, Carousel} from 'react-bootstrap';

// let server = process.env.REACT_APP_SERVER;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalShown: false,
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

  postBook = async (aBook) => {
    try {
      // make the request to add a cat to my server
      // axios.post will return the cat that was added to the database with the ID and version number
      // axios.post takes in 2 parameters: the URL endpoint, and the thing we want added:
      let bookThatWasAdded = await axios.post(`${process.env.REACT_APP_SERVER}/books`, aBook);
      console.log(bookThatWasAdded);
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  // deleteCat = async (id) => {
  //   // ex URL:
  //   // http://localhost:3001/cats/637bceabc57c693faee21e8f
  //   try {
  //     let url = `${SERVER}/cats/${id}`;
  //     // do not assume that axios.delete() will return a value
  //     await axios.delete(url);
  //     // // this is ok for today's lab
  //     // this.getCats();
  //     let updatedCats = this.state.cats.filter(cat => cat._id !== id);
  //     this.setState({
  //       cats: updatedCats
  //     })
  //   } catch (err) {
  //     console.log('We have an error: ', err.response.data);
  //   }
  // }

  handleBookSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
    let newBook = {
      title: e.target.title.value,
      description: e.target.description.value,
      status: e.target.status.checked,
    }
    this.postBook(newBook);
  }

  showModal = () => {
    this.setState({
      isModalShown: true,
    })
  }

  handleCloseModal = () => {
    this.setState({
      isModalShown: false,
    })
  }

  componentDidMount() {
    this.getBooks();
  }

  render() {

    /* TODO: render all the books in a Carousel */
    // Carousel constructor
    let carouselItems = this.state.books.map( book => {
      return (
        <Book 
          book={book} 
          key={book._id}
          // deleteCat={this.props.deleteBook}
        />
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

        <Button onClick={this.showModal} >Add Book</Button>
        <BookFormModal 
          isModalShown={this.state.isModalShown}
          handleBookSubmit={this.handleBookSubmit}
          handleCloseModal={this.handleCloseModal}
        />
      </>
    )
  }
}

class Book extends React.Component {
  render () {
    return (
      <>
        <Carousel.Item>
          <p>{this.props.book.title}</p>
          <p>{this.props.book.description}</p>
          <p>{this.props.book.status}</p>
        </Carousel.Item>
      </>
    );

  }
}

export default BestBooks;
