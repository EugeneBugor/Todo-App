import React, { Component } from 'react';
import TodoList from './containers/TodoList.js';
import TodoForm from './components/TodoForm';

import $ from 'jquery';
import './styles/index.less';
import 'font-awesome-webpack';
import 'font-awesome/css/font-awesome.css';

export default class TodoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isUpdating: false,
            updatingTaskData: []
        };
    }

    loadDataFromServer = () => {
        $.ajax({
            url: '/tasks',
            dataType: 'json',
            type: 'GET',
            success: data => this.setState({data: data}),
            error: (xhr, status, err) => {
                console.error(`/tasks`, status, err.toString());
            }
        })
    };

    //request to add a new task
    handleAdd = task => {
        const tasks = this.state.data;
        const newTasks = tasks.concat([task]);
        this.setState({data: newTasks});
        $.ajax({
            url: '/create-task',
            dataType: 'json',
            type: 'POST',
            data: task,
            success: this.loadDataFromServer,
            error: (xhr, status, err) => {
                this.setState({data: tasks});
                console.error(`/create-task`, status, err.toString());
            }
        });
    };

    //request to delete the task
    handleDelete = item => {
        $.ajax({
            url: `/delete/${item.id}`,
            dataType: 'json',
            type: 'DELETE',
            'data': item,
            success: this.loadDataFromServer,
            error: (xhr, status, err) => {
                console.error(`/delete/:${item.id}`, status, err.toString());
            }
        });
    };

    //request to update the task
    handleUpdate = (updatedData) => {
        $.ajax({
            url: `/update/${updatedData.id}`,
            dataType: 'json',
            type: 'PUT',
            'data': updatedData,
            success: this.loadDataFromServer,
            error: (xhr, status, err) => {
                console.error(`/update/:${updatedData.id}`, status, err.toString());
            }
        });
    };

    handleGettingTask = (id) => {
        $.ajax({
            url: `/get/${id}`,
            dataType: 'json',
            type: 'GET',
            success: data => this.setState({ updatingTaskData: data }),
            error: (xhr, status, err) => {
                console.error(`/get/:${id}`, status, err.toString());
            }
        })
    };

    componentWillMount = () => {
        this.loadDataFromServer();
    };

    handleUpdateStart = (id) => {
        this.setState({
            isUpdating: !this.state.isUpdating
        });

        id && this.handleGettingTask(id);
    };

    handleUpdateEnd = (new_text) => {
        this.handleUpdate({
            id: this.state.updatingTaskData[0].id,
            text: new_text
        });

        this.setState({
            isUpdating: false,
            updatingTaskData: {}
        })
    };

    handleCancelUpdate = () => {
        this.setState({
            isUpdating: false,
            updatingTaskData: {}
        })
    };


    render() {
        const {
            data,
            isUpdating,
            updatingTaskData
        } = this.state;

        return (
            <div id="todoBox">
                <TodoList data={data}
                          handleDelete={this.handleDelete}
                          updatingTaskId={updatingTaskData[0] && updatingTaskData[0].id || null}
                          handleUpdateStart={this.handleUpdateStart}
                          isUpdating={isUpdating}
                />
                <div className="form-wrapper">
                    <TodoForm submit={this.handleAdd}
                              handleUpdate={this.handleUpdate}
                              handleUpdateEnd={this.handleUpdateEnd}
                              isUpdating={isUpdating}
                              updatingTaskData={updatingTaskData[0] && updatingTaskData[0].text || null}
                              handleCancelUpdate={this.handleCancelUpdate}
                    />
                </div>
            </div>
        )
    }
};
