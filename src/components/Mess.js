import React, { Component } from 'react';
class Mess extends Component {
    render() {
        let show = this.props.show;
        let mess = <div>
            <p> You win</p>
            <button onClick={() => this.props.clickHandlerMess()}>new game</button>
        </div>
        return (
            <div className="noBody"
                style={{
                    display: show ? 'block' : 'none'
                }}>
                <div className="message">
                    {mess}
                </div>
            </div>
        )
    }
}
export default Mess;
