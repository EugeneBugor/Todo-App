import React, {Component, PropTypes} from 'react'
import TodoItems from './../components/TodoItems';

export default class TodoList extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        handleClose: PropTypes.func.isRequired,
        showAll: PropTypes.bool.isRequired,
        handleRedact: PropTypes.func.isRequired
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
        });

        return (
            <div id="todoList">
                {list}
            </div>
        )
    }
};