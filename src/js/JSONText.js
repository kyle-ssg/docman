import React, {Component, PropTypes} from 'react';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    componentDidMount () {
        var mode = "application/json";
        try {
            JSON.parse(this.props.value)
        } catch (e) {
            mode = "text";
        }

        this.editor = CodeMirror.fromTextArea(this.refs.textarea, {
            lineWrapping: true,
            lineNumbers: true,
            textWrapping: true,
            indentWithTabs: true,
            mode,
            readOnly: this.props.readOnly,
            foldGutter: true,
            matchBrackets: true,
            autoCloseBrackets: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
            lint: true,
            theme: 'base16-dark',
        });
    }

    render () {
        var value = this.props.value;
        try {
            JSON.parse(this.props.value)
            value = JSON.parse(this.props.value);
            value = JSON.stringify(value, null, 2);
        } catch (e) {}

        return (
            <textarea ref="textarea" {...this.props} value={value}/>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;