import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs';
import Button from './Button';
import JSONText from './JSONText';

const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor (props, context) {
        super(props, context);
        this.headersEditor = null;
        this.editor = null;

        this.state = {
            tab: 0,
            bodyString: this.props.request && this.props.request.body,
            headersString: this.props.request && this.props.request.headers,
            url: this.props.request && this.props.request.url,
        };
    }

    componentWillUpdate = (newProps, newState) => {
        this.resetEditors();
    };

    componentDidMount () {
        this.resetEditors();
    }

    selectTab = (tab)=> {
        this.setState({ tab });
    };

    resetEditors = () => {
        var config = {
            lineWrapping: true,
            lineNumbers: true,
            textWrapping: true,
            indentWithTabs: true,
            readOnly: false,
            foldGutter: true,
            mode: "application/json",
            matchBrackets: true,
            autoRefresh: true,
            autoCloseBrackets: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
            lint: true,
            theme: 'base16-dark',
        };
        _.defer(()=> {

            if (this.headersEditor) {
                this.headersEditor.refresh();
            } else {
                if (this.refs.headers) {
                    this.headersEditor = CodeMirror.fromTextArea(this.refs.headers, config)
                }
            }
            if (this.editor) {
                this.editor.refresh();
            } else {
                if (this.refs.body) {
                    this.editor = CodeMirror.fromTextArea(this.refs.body, config);
                }
            }


        })
    }


    sendRequest = (e) => {
        e.preventDefault();
        var { method } = this.props.request;

        var body = this.editor ? this.editor.getValue() : this.state.bodyString;
        var headers = this.headersEditor ? this.headersEditor.getValue() : this.state.headersString;

        this.setState({
            isLoading: true,
            error: "",
            response: ""
        });

        fetch(this.state.url, {
            method,
            headers: JSON.parse(headers),
            body: method == "GET" ? null : body
        }).then((response)=> {

            if (response.status >= 200 && response.status < 300) {
                response.text().then((text)=>this.setState({ error: "", response: text, isLoading: false }))
            } else {
                response.text().then((text)=>this.setState({ error: text && text.trim(/\n/), isLoading: false }))
            }
        }).catch(()=> {
            res.json().then((result)=> {
                this.setState({ result })
            })
        })
    };

    componentWillReceiveProps (newProps) {
        if (newProps.request !== this.props.request) {
            this.setState({
                error: "",
                response: "",
                tab: newProps.request.method == "GET" ? 0 : this.state.tab,
                bodyString: newProps.request && newProps.request.body,
                headersString: newProps.request && newProps.request.headers,
                url: newProps.request && newProps.request.url,
                isLoading: false
            }, this.resetEditors);
        }
    }


    render () {
        var { headers, method, body, url } = this.props.request;
        return (
            <div>
                <div className="alert">
                    <h3>Request</h3>
                    <Tabs value={this.state.tab} onChange={this.selectTab}>

                        { method !== "GET" && (
                            <div tabLabel={"Body"}>
                                <textarea value={this.state.bodyString} ref="body"/>
                            </div>
                        )}

                        <div tabLabel={"Headers"}>
                            <textarea value={this.state.headersString} ref="headers"/>
                        </div>

                    </Tabs>

                    <div className="fixed-bottom">
                        {this.state.isLoading && (
                            <div className="text-center">
                                <div>Loading...</div>
                            </div>
                        )}
                        {this.state.error && (
                            <div className="error">
                                <h2>Error</h2>
                                <JSONText value={this.state.error}/>
                            </div>
                        )}
                        {this.state.response && (
                            <div className="error">
                                <h2>Response</h2>
                                <JSONText value={this.state.response}/>
                            </div>
                        )}
                        <form onSubmit={this.sendRequest} className="flex-row">
                            <div className="flex-column">
                                {method}
                            </div>
                            <input type="text" className="url flex-1 flex-column" placeholder="url"
                                   value={this.state.url}
                                   onChange={(e)=>this.setState({ url: e.currentTarget.value })}
                            />

                            <div className="text-right flex-column">
                                <Button className="btn">
                                    Send
                                </Button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;