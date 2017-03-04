import React, {Component, PropTypes} from 'react'
import TodoItems from './../components/TodoItems';

export default class TodoList extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        handleClose: PropTypes.func.isRequired,
        handleRedact: PropTypes.func.isRequired
    };

    componentDidMount = () => {
        const grid = this.refs.grid;
        this.msnry = new Masonry( grid, {
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

    render () {
        const {data, handleClose, showAll, handleRedact} = this.props;

        const list = data.map(item => {
            return (
                <TodoItems key={item.id}
                           ID={+item.id}
                           close={item.close}
                           handleClose={handleClose}
                           handleRedact={handleRedact}
                           showAll={showAll}
                >
                    {item.text}
                </TodoItems>
            )
        }).reverse();

        return (
            <div id="todoList" ref="grid">
                {list && list.length ? list : <span className="items-placeholder">Your thought..</span>}
            </div>
        )

    }
};