import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

constructor(props) {
    super(props);

    this.state = {
        tournaments: []
    };
}

componentDidMount() {
    axios.get(`http://localhost:8080/`)
        .then(res => {
            console.log(res.data);
            const tournaments = res.data;
            this.setState({ tournaments });
        });
}

render() {
    return (
        <div>
            <h1>Begin of battleCraft</h1>
            <ul>
                {this.state.tournaments.map(tournament =>
                    <li key={tournament.id}>{tournament.id}</li>
                )}
            </ul>
        </div>
    );
}
}

export default App;
