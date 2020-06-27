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
        // reinstate our localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        // only setState w/ localStorage if store exists in localStorage
        if (localStorageRef) {
            this.setState({ order: JSON.parse(localStorageRef) });
        }

        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        });
    }

    componentDidUpdate() {
        console.log(this.state.order);
        // localStorage.setItem requires a key/value
        // sending the store as key and order state as value
        localStorage.setItem(
            this.props.match.params.storeId,
            JSON.stringify(this.state.order)
        );
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

    updateFish = (key, updatedFish) => {
        // Make a copy of the existing state
        const updatedFishes = { ...this.state.fishes };
        // Add the updatedFish to the copy (updatedFishes)
        updatedFishes[key] = updatedFish;
        // Update the State
        this.setState({
            fishes: updatedFishes
        });
    };

    deleteFish = (key) => {
        // Make a copy of the existing state
        const updatedFishes = { ...this.state.fishes };
        // set the selected fish to be deleted to null in the copy (updatedFishes)
        // setting to null is a Firebase thing
        updatedFishes[key] = null;
        // Update the State
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

    removeFromOrder = (key) => {
        const selectedFish = { ...this.state.order };
        // not using Firebase, so can just use delete
        delete selectedFish[key];
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
                <Order
                    fishes={this.state.fishes}
                    order={this.state.order}
                    removeFromOrder={this.removeFromOrder}
                />
                <Inventory
                    addFish={this.addFish}
                    updateFish={this.updateFish}
                    deleteFish={this.deleteFish}
                    loadSampleFishes={this.loadSampleFishes}
                    fishes={this.state.fishes}
                />
            </div>
        );
    }
}

export default App;
