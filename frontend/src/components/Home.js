import * as React from 'react';

export class Home extends React.Component {
    render() {
        return <div>
            <h1>Assignment 3 - Software Architecture and Frameworks</h1>
            <p>Welcome to the home screen of assignment 3.</p>
            <p>
                A simple CRUD application to manage buildings and their rooms. Please see the PDF for assignment
                detalis.
            </p>

            <br/>
            <hr/>

            <p>In this project i have used these technologies:</p>
            <ul>
                <li><a href='https://projects.spring.io/spring-boot/'>Spring boot</a> as backend (with MySQL database)
                </li>
                <li><a href='https://facebook.github.io/react/'>React</a> as frontend</li>

            </ul>
            <p><a href='https://github.com/facebook/create-react-app'>create-react-app</a> for easy
                configuration.</p>
            <p>
                Please read the README for more information.
            </p>
        </div>;
    }
}
