import React, {Component, PropTypes} from 'react';

export default class TodoForm extends Component {
    static propTypes = {
        submit: PropTypes.func.isRequired
    };

    state = {
        text: ''
    };

    handleText = (e) => {
        const text = e.target.value;

        this.setState({text: text});
    };

    //on data submit
    handleDataSubmit = (e) => {
        const text = this.state.text.trim();
        const {submit} = this.props;
        // ctrl + enter
        if (e.type == 'keydown') {
            if (!text) return;
            if (e.ctrlKey && e.keyCode == 13) {
                submit({text: text});
                this.setState({text: ''});
            }
        } else { // button submit
            if (!text) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            submit({text: text});
            this.setState({text: ''});
        }
    };

    render() {
        const {text} = this.state;
        return (
            <form id="todoForm" onSubmit={this.handleDataSubmit}>
                <textarea onChange={this.handleText}
                          onKeyDown={this.handleDataSubmit}
                          value={text}
                          placeholder="Type your note.."
                          maxLength="1000"/>
                <input className="add-button" type="submit" value="Add"/>
            </form>
        )
    }
};