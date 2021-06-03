import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { Card, CardDeck} from 'react-bootstrap';
import Moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export const Restaurant = props => {

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        console.log(props.id);
        setLoading(true);
        fetch(`https://nameless-crag-65934.herokuapp.com/api/restaurants/${props.id}`).then(res=>res.json()).then(data=>{
            setLoading(false);
            if(data.hasOwnProperty("_id")){
                setRestaurant(data);
                }else{
                    setRestaurant(null)
                }
        })
    },[])

    if(loading){

        return(
            <>
                    <Card bg="light">
                         <Card.Body>
                                 <Card.Text>
                                    Loading Restaurant Data...
                                </Card.Text>
                         </Card.Body>
                     </Card>
            </>
        );

    }else{
        if(restaurant !== null){
            return(
                <>
                     <Card bg="light">
                         <Card.Body>
                                 <Card.Title><h3>{restaurant.name}</h3></Card.Title>
                                 <Card.Text>
                                     {restaurant.address.building} {restaurant.address.street}
                                </Card.Text>
                         </Card.Body>
                     </Card>
                     <br />
                     <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker> 
                    </MapContainer>
                    <br />
                    <CardDeck>
                    {
                        restaurant.grades.map(each=>{
                            return(
                                <Card bg={"light"} 
                                text={"black"}
                                style={{ width: '18rem' }}
                                className="mb-2"
                                key={uuidv4()}>
                                    <Card.Header>Grade: {each.grade}</Card.Header>
                                    <Card.Body>
                                 <Card.Text>
                                     Completed: {Moment(each.date).format('MM/DD/YYYY')}
                                </Card.Text>
                                </Card.Body>
                                </Card>
                            );
                        })
                    }
                    </CardDeck>
                </>
             ); 
        }else{
            return(
                <>
                     <Card bg="light">
                         <Card.Body>
                                 <Card.Text>
                                    Unable to find restaurant with id:{props.id}
                                </Card.Text>
                         </Card.Body>
                     </Card>
                </>
             ); 
        }
    }
}