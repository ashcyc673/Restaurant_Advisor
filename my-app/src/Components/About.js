import React from 'react';
import { Card } from 'react-bootstrap';

export const About = props => {
    return(
       <>
        <Card bg="light">
                <Card.Body>
                    <Card.Title><h3>About</h3></Card.Title>
                        <Card.Text>
                            All about me - the delevoper.
                       </Card.Text>
                </Card.Body>
            </Card>
            <br />
            <p> I'm currently in seneca CPD program, and it's my last semester! Now I'm working on a web project
                based on react it's actually fun!  I think the map feature is pretty cool, I have always want to learn
                that, and thanks for this WEB422 course now I know how to do it.  Another project I've done is based on SQL
                and C++, that one is very challenged, that's a group project and we need to wirte a C++ program and also use SQL
                in the program to retrieve the data from database.  I learned a lot from that project, and also found my passion 
                for dealing with database, I will set that as my goal to become a data engineer.
            </p>
        </>
    ); 
}