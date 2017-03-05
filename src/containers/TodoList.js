import React, {Component, PropTypes} from 'react'
import TodoItems from './../components/TodoItems';

export default class TodoList extends Component {
    static propTypes = {
        isUpdating: PropTypes.bool.isRequired,
        updatingTaskId: PropTypes.number,
        data: PropTypes.array.isRequired,
        handleDelete: PropTypes.func.isRequired,
        handleUpdateStart: PropTypes.func.isRequired
    };

    //creating of grid layout
    componentDidMount = () => {
        const grid = this.refs.grid;
        this.msnry = new Masonry(grid, {
            itemSelector: '.todoItem',
            columnWidth: 200,
            gutter: 10,
            isFitWidth: true
        });
    };

    componentDidUpdate = prevProps => {
        if (this.props.data.length !== prevProps.data.length) {
            this.msnry.reloadItems();
            this.msnry.layout();
        }
    };

    getTasksList = () => {
        const {
            data,
            handleDelete,
            isUpdating,
            handleUpdateStart,
            updatingTaskId
        } = this.props;

        return data ? data.map(item => (
            <TodoItems key={item.id}
                       ID={+item.id}
                       handleDelete={handleDelete}
                       isUpdating={isUpdating}
                       updatingTaskId={updatingTaskId}
                       handleUpdateStart={handleUpdateStart}>
                {item.text}
            </TodoItems>

        )).reverse() : null;
    };

    render() {
        const list = this.getTasksList();

        return (
            <div id="todoList" ref="grid">
                {list && list.length ? list : <span className="items-placeholder">Share your thought..</span>}
            </div>
        )

    }
};