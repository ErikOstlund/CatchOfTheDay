import React from 'react';
import { formatPrice } from '../helpers';

class Order extends React.Component {
    renderOrder = (key) => {
        const fish = this.props.fishes[key];
        const count = this.props.order[key];
        const isAvailable = fish && fish.status === 'available';

        // ensure fish are loaded from firebase before continuing
        // in React, if null is returned, nothing is rendered!
        if (!fish) return null;

        if (!isAvailable) {
            return (
                <li key={key}>
                    Sorry, {fish ? fish.name : 'fish'} is no longer available.
                </li>
            );
        }

        return (
            <li key={key}>
                {count} lbs {fish.name}
                {formatPrice(count * fish.price)}
                <button onClick={() => this.props.removeFromOrder(key)}>
                    &times;
                </button>
            </li>
        );
    };

    render() {
        const orderIDs = Object.keys(this.props.order);

        const grandTotal = orderIDs.reduce((accumulator, key) => {
            const fish = this.props.fishes[key];
            const count = this.props.order[key];
            const isAvailable = fish && fish.status === 'available';

            if (isAvailable) {
                return accumulator + count * fish.price;
            }
            return accumulator;
        }, 0);

        return (
            <div className="order-wrap">
                <h2>Order</h2>
                <ul className="order">{orderIDs.map(this.renderOrder)}</ul>
                <div className="total">
                    Total:
                    <strong>{formatPrice(grandTotal)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
