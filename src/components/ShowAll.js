import React, {Component, PropTypes} from 'react';

export default class ShowAll extends Component {
    static propTypes = {
        handleShowAll: PropTypes.func.isRequired
    };

    state = {
        i: 0
    };

    handleShowAll = () => {
        const {handleShowAll} = this.props;
        const {i} = this.state;

        if (i % 2 == 0) {
            handleShowAll(true);
        } else {
            handleShowAll(false);
        }
        this.setState({i: i + 1});
    };

    render = () => {
        const inner = (this.state.i % 2 == 0 ? 'Show all' : 'Show actual');

        return (
            <button className="showAll-button" onClick={this.handleShowAll}>{inner}</button>
        )
    }
};