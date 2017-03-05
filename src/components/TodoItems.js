import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

export default class TodoItems extends Component {
    static propTypes = {
        handleDelete: PropTypes.func.isRequired,
        ID: PropTypes.number.isRequired,
        updatingTaskId: PropTypes.number,
        handleUpdateStart: PropTypes.func.isRequired
    };

    onDelete = () => {
        const {handleDelete, ID} = this.props;
        handleDelete({id: ID});
    };

    handleUpdateStart = id => {
        this.props.handleUpdateStart(id);
    };

    render() {
        const {children, ID, isUpdating, updatingTaskId} = this.props;

        const deleteButton = <i className="fa fa-trash-o delete-icon" onClick={this.onDelete}/>,
            updateButton = <i className="fa fa-pencil-square-o update-icon" onClick={() => {this.handleUpdateStart(ID)}}/>;

        const inUpdating = isUpdating && updatingTaskId === ID;

        return (
            <div className={classnames("todoItem", {'in-updating': inUpdating})}>
                {!inUpdating && deleteButton}
                {!inUpdating && updateButton}
                <pre className="pre"> {children} </pre>
            </div>
        )
    }
};