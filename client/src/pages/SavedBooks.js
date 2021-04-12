import React from 'react';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { useMutation } from '@apollo/react-hooks';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
import { GET_ME } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

const SavedBooks = () => {

  
  //const [userData, setUserData] = useState({});

  // use this to determine if `useEffect()` hook needs to run again
  //const userDataLength = Object.keys(userData).length;

  const [removeBook] = useMutation(REMOVE_BOOK);

  const { loading, data } = useQuery(GET_ME);
  const userData = data?.me || {};
  console.log(userData);

  //use useQuery hook to execute the GET_ME query on load and save it to a variable named userData

 


  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    //   if (!userData) {
    //     return <h2>LOADING...</h2>;
    // }

    try {
      //const { loading, data } = 
      await removeBook({
        variables: { BookData: { bookId }}
        });

      //const updatedUser = await data.json();
      //setUserData(updatedUser);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    
        // if data isn't here yet, say so
    Auth.login(data.token)
    } catch (e) {
      console.error(e);
    }
    
  };

      if (loading) {
        return <h2>LOADING...</h2>;
    }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedBooks?.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <CardColumns>
          {userData.savedBooks && userData.savedBooks.map((book) => {
            return (
              <Card key={book.bookId} border='dark'>
                {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{book.title}</Card.Title>
                  <p className='small'>Authors: {book.authors}</p>
                  <Card.Text>{book.description}</Card.Text>
                  <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                    Delete this Book!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedBooks;
