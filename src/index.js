import React from 'react';
import ReactDOM from 'react-dom';
import TodoBox from './TodoBox';

ReactDOM.render(
    <TodoBox url="/tasks"/>,
    document.getElementById('container')
);
