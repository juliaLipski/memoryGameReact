import React, { Component } from 'react';
import Cell from './Cell';

class Board extends Component {

    render() {
        let dt = this.props.data.map((item) =>
            <div key={item.id}
                onClick={(event) => this.props.clickHandler(event, item)}>
                <Cell {...item} />
            </div>)
        return (
            <div className="board">
                {dt}
            </div>
        );
    }
}

export default Board;
