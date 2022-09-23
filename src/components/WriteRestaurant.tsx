import React from 'react';
import { Component } from 'react';
import '../css/inputBox.css';

/**
 * WriteRestaurant class
 */
class WriteRestaurant extends Component {
    /**
     * @return { Component } Component
     */
    render() {
        return (
            <form>
                <input className="input_box" type="text" />
            </form>
        );
    }
}

export default WriteRestaurant;
