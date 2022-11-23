import React from 'react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import { Button, Container, Carousel} from 'react-bootstrap';

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
      this.setState({
        books: [...this.state.books, bookThatWasAdded.data]
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  deleteBook = async (id) => {
    // ex URL:
    // http://localhost:3001/cats/637bceabc57c693faee21e8f
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${id}`;
      // do not assume that axios.delete() will return a value
      await axios.delete(url);
      // // this is ok for today's lab
      // this.getCats();
      let updatedBooks = this.state.books.filter(book => book._id !== id);
      this.setState({
        books: updatedBooks,
      });
    } catch (err) {
      console.log('We have an error: ', err.response.data);
    }
  }

  handleBookSubmit = (e) => {
    e.preventDefault();
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
    let carouselItems = this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}>
          <img
            className="d-block w-100"
            src="https://via.placeholder.com/500"
            alt="Books"
            width="500"
            height="400"
          />
          <Carousel.Caption>
            <p>{book.title}</p>
            <p>{book.description}</p>
            <p>{book.status}</p>
            <Button onClick={() => this.deleteBook(book._id)}>Remove Book</Button>
          </Carousel.Caption>
        </Carousel.Item>
        // <Book 
        //   book={book} 
        //   key={book._id}
        //   deleteBook={this.deleteBook}
        // />
      )
    });

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

        {this.state.books.length ? (
          <Container>
            <Carousel>
              {carouselItems}
            </Carousel>
          </Container>
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

// class Book extends React.Component {
//   render () {
//     return (
//       <>
//         <Carousel.Item 
//           key={this.props.key}
//         >
//           <img
//             className="d-block w-100"
//             src="https://via.placeholder.com/500"
//             alt="Books"
//             width="500"
//             height="100"
//           />
//           <Carousel.Caption>
//             <p>{this.props.book.title}</p>
//             <p>{this.props.book.description}</p>
//             <p>{this.props.book.status}</p>
//             <Button onClick={() => this.props.deleteBook(this.props.book._id)}>Remove Book</Button>
//           </Carousel.Caption>
//         </Carousel.Item>
//       </>
//     );

//   }
// }

export default BestBooks;
