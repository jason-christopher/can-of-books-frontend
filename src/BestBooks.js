import React from 'react';
import axios from 'axios';
import BookFormModal from './BookFormModal';
import { Button, Container, Carousel} from 'react-bootstrap';

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isModalShown: false,
      mode: 'add', 
      bookToModify: {},
    }
  }

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

  updateBook = async (bookToUpdate) => {
    try {
      let url = `${process.env.REACT_APP_SERVER}/books/${bookToUpdate._id}`;
      let updatedBookObj = await axios.put(url, bookToUpdate);
      // find the book we updated in state and replace it with the data we got back from the DB
      let updatedBooksArray  = this.state.books.map(book => {
        return book._id === bookToUpdate._id ? updatedBookObj.data : book;
      });
      this.setState({
        books: updatedBooksArray,
      });
      console.log(this.state.books);
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
    this.setState({
      isModalShown: false,
    })
    this.postBook(newBook);
  }

  handleBookUpdate = (e) => {
    e.preventDefault();
    let Book = {
      title: e.target.title.value || this.state.bookToModify.title,
      description: e.target.description.value || this.state.bookToModify.description,
      status: this.state.bookToModify.status,
      __v: 0,
      _id: this.state.bookToModify._id,
    }
    this.setState({
      isModalShown: false,
    })
    this.updateBook(Book);
  }

  handleFavorite = (book) => {
    let newStatus = '';
    if(book.status === false) {
      newStatus = true;
    } else {
      newStatus = false;
    }
    let Book = {
      title: book.title,
      description: book.description,
      status: newStatus,
      __v: 0,
      _id: book._id,
    }
    this.updateBook(Book);
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

    let carouselItems = this.state.books.map(book => {
      return (
        <Carousel.Item key={book._id}>
          <img
            className="d-block w-100"
            src="https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/sv199317-image-kwvufyxm.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=2f9ae0de50355b994978237208c55341"
            alt="Books"
            height="600"
          />
          <Carousel.Caption >
            <section className="descriptionDiv">
              <p className="bookTitle">{book.title}</p>
              <p className="bookDescription">{book.description}</p>
              <div className="bookModifyDiv">
                <img 
                  className="bookHeart" 
                  src={book.status ? "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-128.png" : "https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-heart-outline-128.png"} 
                  alt="heart" 
                  onClick={() => {
                    this.setState({bookToModify: book});
                    this.handleFavorite(book);
                  }}/>
                <Button className="button" onClick={() => this.setState({isModalShown: true, mode: 'update', bookToModify: book})}>Modify Book</Button>
                <Button className="button" onClick={() => this.deleteBook(book._id)}>Remove Book</Button>
              </div>
            </section>
          </Carousel.Caption>
        </Carousel.Item>
      )
    });

    return (
      <>
        <div className="line2"></div>
        <div id="libraryDiv">
          <Button onClick={() => this.setState({isModalShown: true, mode: 'add'})}id="addBookButton">Add Book</Button>
        </div>
        {this.state.books.length ? (
          <Container id="main">
            <Carousel className="carousel">
              {carouselItems}
            </Carousel>
          </Container>
        ) : (
          <h3>No Books Found :(</h3>
        )}
        <BookFormModal 
          isModalShown={this.state.isModalShown}
          mode={this.state.mode}
          bookToModify={this.state.bookToModify}
          handleBookSubmit={this.handleBookSubmit}
          handleBookUpdate={this.handleBookUpdate}
          handleCloseModal={this.handleCloseModal}
        />
      </>
    )
  }
}

export default BestBooks;
