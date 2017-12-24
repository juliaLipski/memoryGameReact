import React, { Component } from 'react';

export default ({ show, avatar, backImg }) => {
    let pic = show ? avatar : backImg;
    return (
        <div className="cell" >
            <img src={pic} />
        </div>
    )
}
