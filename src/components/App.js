import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
    state = {
        fishes: {},
        order: {}
    };

    // initialize/sync app state with firebase
    componentDidMount() {
        const { params } = this.props.match;
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentWillUnmount() {
        base.removeBinding(this.ref);
    }

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

    addToOrder = (key) => {
        // Make a copy of the existing state
        const selectedFish = { ...this.state.order };

        // Add to order or update the qty in the order
        selectedFish[key] = selectedFish[key] + 1 || 1;

        // use React api to update the state
        this.setState({
            order: selectedFish
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
                                fishKey={key}
                                fishDetails={this.state.fishes[key]}
                                addToOrder={this.addToOrder}
                            />
                        ))}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order} />
                <Inventory
                    addFish={this.addFish}
                    loadSampleFishes={this.loadSampleFishes}
                />
            </div>
        );
    }
}

export default App;
