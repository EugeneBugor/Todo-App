import React, {Component, PropTypes} from 'react';

export default class TodoItems extends Component {
    static propTypes = {
        handleClose: PropTypes.func.isRequired,
        handleRedact: PropTypes.func.isRequired,
        ID: PropTypes.number.isRequired,
        close: PropTypes.bool,
        showAll: PropTypes.bool.isRequired
    };

    state = {
        text: ''
    };

    onClose = () => {
        const {handleClose, ID} = this.props;
        handleClose({id: ID});
    };

    handleText = (e) => {
        const text = e.target.value;

        this.setState({text: text});
    };

    onCancelRedact = (e) => {
        const cancelButton = e.target,
            pre = cancelButton.parentNode.parentNode.getElementsByTagName('pre')[0],
            closeButton = cancelButton.parentNode.parentNode.getElementsByClassName('close-button')[0],
            redactButton = cancelButton.parentNode.parentNode.getElementsByClassName('redact-button')[0],
            redactDiv = cancelButton.parentNode,
            textArea = document.getElementById('todoForm').firstElementChild,
            closeAllButton = document.getElementsByClassName('closeAll-button')[0];

        closeButton.style.display = '';
        redactButton.style.display = '';
        pre.style.display = '';
        redactDiv.style.display = 'none';

        Array.from(document.getElementsByClassName('close-button')).forEach(item => {
            item.removeAttribute('disabled');
        });

        Array.from(document.getElementsByClassName('redact-button')).forEach(item => {
            item.removeAttribute('disabled');
        });

        textArea.removeAttribute('disabled');
        closeAllButton.removeAttribute('disabled');
    };

    onSaveRedact = (e) => {
        const {handleRedact, ID} = this.props;

        const saveButton = e.target,
            text = this.state.text.trim();

        e.preventDefault();

        if (!text) return;

        handleRedact({id: ID, text: text, redact: true});

        const pre = saveButton.parentNode.parentNode.getElementsByTagName('pre')[0],
            closeButton = saveButton.parentNode.parentNode.getElementsByClassName('close-button')[0],
            redactButton = saveButton.parentNode.parentNode.getElementsByClassName('redact-button')[0],
            redactDiv = saveButton.parentNode,
            textArea = document.getElementById('todoForm').firstElementChild,
            closeAllButton = document.getElementsByClassName('closeAll-button')[0];

        closeButton.style.display = '';
        redactButton.style.display = '';
        pre.style.display = '';
        redactDiv.style.display = 'none';

        Array.from(document.getElementsByClassName('close-button')).forEach(item => {
            item.removeAttribute('disabled');
        });

        Array.from(document.getElementsByClassName('redact-button')).forEach(item => {
            item.removeAttribute('disabled');
        });

        textArea.removeAttribute('disabled');
        closeAllButton.removeAttribute('disabled');
    };

    onRedact = (e) => {
        const redactButton = e.target,
            closeButton = redactButton.previousSibling,
            textArea = document.getElementById('todoForm').firstElementChild,
            closeAllButton = document.getElementsByClassName('closeAll-button')[0];
        const pre = redactButton.nextSibling,
            value = pre.innerHTML; //value of onchange task

        this.setState({text: value});

        const redactDiv = redactButton.parentNode.getElementsByClassName('redactDiv')[0];

        pre.style.display = 'none';
        redactDiv.style.display = '';

        textArea.setAttribute('disabled', '');
        closeAllButton.setAttribute('disabled', '');

        Array.from(document.getElementsByClassName('close-button')).forEach(item => {
            item.setAttribute('disabled', '');
        });

        Array.from(document.getElementsByClassName('redact-button')).forEach(item => {
            item.setAttribute('disabled', '');
        });

        closeButton.style.display = 'none';
        redactButton.style.display = 'none';
    };

    render() {
        const {close, showAll, children} = this.props;
        const {text} = this.state;

        const closeButton = <button className="close-button" onClick={this.onClose}/>,
            redactButton = <button className="redact-button" onClick={this.onRedact}/>,
            saveButton = <button className="save-button" onClick={this.onSaveRedact}/>,
            cancelButton = <button className="cancel-button" onClick={this.onCancelRedact}/>;


        return close ? (showAll ? (
            <div className="todoItem" style={{display: 'block', background: 'lightcoral'}}>
                <pre className="pre">
                    {children}
                </pre>
            </div>
        ) : null) : (
            <div className="todoItem" style={{display: 'block'}}>
                {closeButton}
                {redactButton}
                <pre className="pre">
                    {children}
                </pre>

                <div className="redactDiv" style={{display: 'none'}}>
                    {saveButton}
                    {cancelButton}
                    <textarea className="redactField" value={text} onChange={this.handleText}/>
                </div>

            </div>
        )
    }
};