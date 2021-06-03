import { Button, Col, Container, Form, FormControl, Nav, Navbar, Row } from 'react-bootstrap';
import { useHistory, Redirect, Route, Switch} from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react';
import { About } from './Components/About';
import { Restaurants } from './Components/Restaurants';
import queryString from 'query-string';
import { Restaurant } from './Components/Restaurant';
import { NotFound } from './Components/NotFound';

 
export const App = () =>
{

  const [searchString, setSearchString] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
      e.preventDefault();
      history.push(`/restaurants?borough=${searchString}`)
      setSearchString("");
  }
  
  return(
    <div>
     <Navbar bg="light" expand="lg">
        <LinkContainer to="/">
        <Navbar.Brand>New York Restaurants</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"> 
        <LinkContainer to="/restaurants">
        <Nav.Link>Full List</Nav.Link> 
        </LinkContainer> 
        <LinkContainer to="/about">
        <Nav.Link>About</Nav.Link> 
        </LinkContainer>
        </Nav>
        <Form onSubmit={handleSubmit} inline>
        <FormControl type="text" placeholder="Borough" className="mr-sm-2" value={searchString} onChange={(e) => setSearchString(e.target.value)} />
        <Button type="submit" variant="outline-success">Search</Button> 
        </Form>
        </Navbar.Collapse> 
      </Navbar>
      <br />
      <Container>
        <Row>
          <Col>
          <Switch>
              <Route exact={true} path="/" render={()=>(<Redirect to="/Restaurants" />)}/> 
              <Route exact={true} path="/about" component={About} />
              <Route exact={true} path="/Restaurants" render={(props)=>(<Restaurants query={queryString.parse(props.location.search)}/>)} />
              <Route exact={true} path="/Restaurant/:id" render={(props)=>(<Restaurant id={props.match.params.id} />)} />
              <Route component={NotFound} />
            </Switch>
          </Col> 
        </Row>
      </Container>
    </div>

  );
}


