import React, {Component, PropTypes} from 'react';

export default class CloseAll extends Component {
    static propTypes = {
        handleClose: PropTypes.func.isRequired
    };

    onClose = () => {
        this.props.handleClose({closeAll: true});
    };

    render() {
        return (
            <button className="closeAll-button" onClick={this.onClose}>Close all</button>
        )
    }
};
