import React from 'react';
import { formatPrice } from '../helpers';

class Fish extends React.Component {
    render() {
        const { desc, image, name, price, status } = this.props.fishDetails;
        return (
            <li className="menu-fish">
                <img src={image} alt={name}></img>
                <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button>Add To Cart</button>
            </li>
        );
    }
}

export default Fish;
