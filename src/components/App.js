import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    addFish = (fish) => {
        // Make a copy of the existing state
        const updatedFishes = { ...this.state.fishes };

        // Add the new fish to the copied state
        // NOTE: using a timestamp for the fish number
        updatedFishes[`fish${Date.now()}`] = fish;

        // use React api to update the state
        this.setState({
            fishes: updatedFishes
        });
    };

    loadSampleFishes = () => {
        this.setState({
            fishes: sampleFishes
        });
    };

    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh Seafood Market" />
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map((key) => (
                            <Fish
                                key={key}
                                fishDetails={this.state.fishes[key]}
                            />
                        ))}
                    </ul>
                </div>
                <Order />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;
