import TodoList from './containers/TodoList.js';
import TodoItems from './components/TodoItems'
import CloseAll from './components/CloseAll';
import ShowAll from './components/ShowAll';
import TodoForm from './components/TodoForm';

import $ from 'jquery';
import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

import './styles/index.less';

export default class TodoBox extends Component {
    state = {
            data: [],
            showAll: false
    };

    loadDataFromServer = () => {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: data => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        })
    };

    handleDataSubmit = (task) => {
        const tasks = this.state.data;
        task.id = Date.now();
        const newTasks = tasks.concat([task]);
        this.setState({data: newTasks});
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: task,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                this.setState({data: tasks});
                console.error(this.props.url, status, err.toString());
            }
        });
    };

    handleClose = item => {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            'data': item,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    };

    handleShowAll = (show) => {
        this.setState({
            showAll: show
        });
    };

    handleRedact = (redactedData) => {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            'data': redactedData,
            success: (data) => {
                this.setState({data: data});
            },
            error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    };

    componentDidMount = () => {
        this.loadDataFromServer();

        const todoList = document.getElementById('todoList');
        todoList.scrollTop = todoList.scrollHeight;
    };

    componentDidUpdate = (prevProps, prevState) => {
        const {data} = this.state;
        let flag = true;
        prevState.data.forEach((prevItem, i) => {
            for (let key in prevItem) {
                if (key == 'close') {
                    if (data[i].close != prevItem[key]) {
                        flag = false;
                        return;
                    }
                }
            }
        });
        if (flag) {
            const todoList = document.getElementById('todoList');
            todoList.scrollTop = todoList.scrollHeight;
        }
    };

    render() {
        const {data, showAll} = this.state;
        return (
            <div id="todoBox">
                <TodoList data={data}
                          handleClose={this.handleClose}
                          handleRedact={this.handleRedact}
                          showAll={showAll}
                />
                <TodoForm submit={this.handleDataSubmit}/>
                <ShowAll handleShowAll={this.handleShowAll}/>
                <CloseAll handleClose={this.handleClose}/>
            </div>
        )
    }

};