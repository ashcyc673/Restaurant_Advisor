import React, { useState, useEffect } from 'react';
import { Card, Table, Pagination } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

export const Restaurants = props => {
    const history = useHistory();

    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const previousPage = () => { 
        if(page > 1){
            setPage(page - 1);
        }
    }

    const nextPage = () => {

        setPage(page + 1);
    }

    useEffect(()=>{
        setLoading(true);
        let heroku = `https://nameless-crag-65934.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
        if(props.query.borough !== undefined){
            heroku += `&borough=${props.query.borough}`;
        }
        fetch(heroku).then(res=>res.json()).then(data=>{
            setRestaurants(data.message);
            setLoading(false);
        })

    },[props.query,page]);

    if(loading){
        return(
            <Card bg="light">
                <Card.Body>
                        <Card.Text>
                            Loading Restaurants...
                       </Card.Text>
                </Card.Body>
            </Card>
        );
    }else{
        if(restaurants !== null && restaurants.length !== 0){
            return(
                <>
                    <Card bg="light">
                <Card.Body>
                    <Card.Title><h3>Restaurant List</h3></Card.Title>
                        <Card.Text>
                            Full list of restaurants. Optionally sorted by borough
                       </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Borough</th>
                    <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(each => (
                        <tr onClick={()=>{ history.push(`/restaurant/${each._id}`)}} key={each._id}>
                            <td>{each.name}</td>
                            <td>{each.address.building} {each.address.street}</td>
                            <td>{each.borough}</td>
                            <td>{each.cuisine}</td>
                        </tr>
                    ))}
                </tbody>
                </Table>
                <Pagination> 
                <Pagination.Prev onClick={()=>{previousPage()}}/> 
                <Pagination.Item>{page}</Pagination.Item> 
                <Pagination.Next onClick={()=>{nextPage()}}/>
                </Pagination>
                </>
            );
        }else{
            return(
                <Card bg="light">
                <Card.Body>
                        <Card.Text>
                            No Restaurants Found
                       </Card.Text>
                </Card.Body>
            </Card>
            );
        }
    }
}