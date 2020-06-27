import React from 'react';

class EditFishForm extends React.Component {
    handleChange = (event) => {
        console.log(event.currentTarget.name);
        // make a copy of the edited fish
        const updatedFish = {
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value
        };
        // pass the event data up
        this.props.updateFish(this.props.fishKey, updatedFish);
    };

    render() {
        return (
            <div className="fish-edit">
                <input
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={this.props.fish.name}
                />
                <input
                    name="price"
                    type="text"
                    onChange={this.handleChange}
                    value={this.props.fish.price}
                />
                <select
                    name="status"
                    onChange={this.handleChange}
                    value={this.props.fish.status}
                >
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold Out</option>
                </select>
                <textarea
                    name="desc"
                    onChange={this.handleChange}
                    value={this.props.fish.desc}
                ></textarea>
                <input
                    name="image"
                    type="text"
                    onChange={this.handleChange}
                    value={this.props.fish.image}
                />
                <button
                    onClick={() => this.props.deleteFish(this.props.fishKey)}
                >
                    Remove Fish
                </button>
            </div>
        );
    }
}

export default EditFishForm;
