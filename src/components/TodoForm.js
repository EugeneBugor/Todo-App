import React, {Component, PropTypes} from 'react';

export default class TodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        };
    }

    static propTypes = {
        submit: PropTypes.func.isRequired,
        updatingTaskData: PropTypes.string,
        isUpdating: PropTypes.bool,
        handleUpdateEnd: PropTypes.func.isRequired,
        handleCancelUpdate: PropTypes.func.isRequired
    };

    handleText = (e) => {
        const text = e.target.value;

        this.setState({text: text});
    };

    //on data submit
    handleDataSubmit = (e) => {
        const text = this.state.text.trim();
        const {submit, isUpdating} = this.props;
        if (!isUpdating) {
            if (!text) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            submit({text: text});
            this.setState({text: ''});
        }
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.isUpdating) {
            this.setState({text: nextProps.updatingTaskData})
        }
    };

    //on updating the task
    handleUpdateEnd = (e) => {
        this.props.handleUpdateEnd(this.state.text);
        this.setState({text: ''});
    };

    handleCancelUpdate = () => {
        this.props.handleCancelUpdate();
        this.setState({text: ''});
    };

    render() {
        const { text } = this.state;
        const { isUpdating } = this.props;
        return (
            <form id="todoForm" onSubmit={this.handleDataSubmit}>
                <textarea onChange={this.handleText}
                          value={text || ''}
                          placeholder="Type your note.."
                          autoFocus
                          maxLength="1000"/>
                {isUpdating ? [
                    <div key={1} className="cancel-button" type="button" onClick={this.handleCancelUpdate}>Cancel</div>,
                    <div key={2} className="update-button" type="button" onClick={this.handleUpdateEnd}>Update</div>
                ] : (
                    <button className="add-button" type="submit"/>
                )}
            </form>
        )
    }
};
