import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import Cell from './Cell';
import Mess from './Mess';
import Win from './Win';
import Board from './Board';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWinMess: false,
            flippedCards: [],
            lastCell: "null",
            itemsData: []
        }
    }


    isGameOwer(s1, s2) {
        if (s1 == s2) {
            let showWinMess = this.state.showWinMess = true;
            this.setState({ showWinMess })
        }
    }
    handleRemoveMess() {
        this.state.showWinMess = false;
        this.state.flippedCards = [],
            this.getData();
    }

    handleChangeShow(event, item) {
        let itemsData = this.state.itemsData;
        let lastCell = this.state.lastCell;
        let flippedCards = this.state.flippedCards;

        itemsData.forEach(it => {
            if (item.id == it.id) {
                it.show = true;
            }
        })
        this.setState({ itemsData, lastCell: item });
        if (lastCell.avatar == item.avatar && lastCell.id !== item.id) {
            itemsData.forEach(it => {
                if (item.id == it.id | lastCell.id == it.id) {
                    it.show = true;
                }
            })

            flippedCards = [...flippedCards, item, lastCell];
            this.setState({ flippedCards, itemsData });
            this.isGameOwer(flippedCards.length, itemsData.length)
        } else {
            setTimeout(() => {
                itemsData.forEach(it => {
                    if (item.id == it.id) {
                        it.show = false;
                    }
                })
                this.setState({ itemsData })
            }, 500);
        }
    }

    getData() {
        fetch('/static/data/items.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                let itemsData = _.shuffle(data);
                this.setState({ itemsData });
            })
            .catch(error => {
                console.error(`fetch operation failed: ${error.message}`);
            });
    }

    componentWillMount() {
        this.getData();
    }
    render() {
        return (
            <div className="center">
                <Mess show={this.state.showWinMess} clickHandlerMess={this.handleRemoveMess.bind(this)} />
                <Win current={this.state.flippedCards.length} />
                <Board data={this.state.itemsData} clickHandler={this.handleChangeShow.bind(this)} />
            </div>
        )
    }
}

