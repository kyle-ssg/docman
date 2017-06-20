import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs';
import Button from './Button';
import JSONText from './JSONText';
import objectToCurl from './utils/object-to-curl';
var Clipboard = require('clipboard');
const TheComponent = class extends Component {
    displayName: 'TheComponent'

    constructor(props, context) {
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

    componentDidMount() {
        new Clipboard('.btn-copy');
        this.resetEditors();
    }

    selectTab = (tab) => {
        this.setState({ tab });
    };

    resetEditors = () => {
        var config = {
            lineWrapping: true,
            lineNumbers: true,
            textWrapping: true,
            indentWithTabs: true,
            readOnly: false,
            foldGutter: false,
            mode: "application/json",
            matchBrackets: true,
            autoRefresh: true,
            autoCloseBrackets: true,
            gutters: ["CodeMirror-lint-markers"],
            lint: true,
            theme: 'base16-dark',
        };
        _.defer(() => {
            //Headers editor
            if (this.headersEditor) {
                this.editor.setValue(this.state.headersString)
                this.headersEditor.refresh();
            } else {
                if (this.refs.headers) {
                    this.headersEditor = CodeMirror.fromTextArea(this.refs.headers, config)
                }
            }
            //cURL editor
            if (this.curlEditor) {
                this.editor.setValue(this.getCurl())

                this.curlEditor.refresh();
            } else {
                if (this.refs.curl) {
                    this.curlEditor = CodeMirror.fromTextArea(this.refs.curl, Object.assign({}, config, { mode: 'shell' }))
                }
            }
            //Fetch editor
            if (this.fetchEditor) {
                this.editor.setValue(this.getFetch())

                this.fetchEditor.refresh();
            } else {
                if (this.refs.fetch) {
                    this.fetchEditor = CodeMirror.fromTextArea(this.refs.fetch, Object.assign({}, config, { mode: 'text/javascript' }))
                }
            }
            //Editor
            if (this.editor) {
                this.editor.setValue(this.state.bodyString)
                this.editor.refresh();
            } else {
                if (this.refs.body) {
                    this.editor = CodeMirror.fromTextArea(this.refs.body, config);
                }
            }


        })
    }


    getCurl = () => {
        var { method } = this.props.request;
        var body = this.editor ? this.editor.getValue() : this.state.bodyString;
        var headers = this.headersEditor ? this.headersEditor.getValue() : this.state.headersString;

        return objectToCurl(this.state.url, {
            method,
            headers: this.props.token ? Object.assign(JSON.parse(headers), { authorization: 'Basic ' + this.props.token }) : JSON.parse(headers),
            body: method == "GET" ? null : JSON.parse(body)
        })
    };

    getFetch = () => {
        var { method } = this.props.request;
        var body = this.editor ? this.editor.getValue() : this.state.bodyString;
        var headers = this.headersEditor ? this.headersEditor.getValue() : this.state.headersString;

        headers = this.props.token ? Object.assign(JSON.parse(headers), { authorization: 'Basic ' + this.props.token }) : JSON.parse(headers)

        return `fetch('${this.state.url}', {\n  method:'${method}',\n  headers: ${JSON.stringify(headers, null, 2)},\n  body: ${body}\n})`;
    };


    sendRequest = (e) => {
        e.preventDefault();
        var { method } = this.props.request;

        var body = this.editor ? this.editor.getValue() : this.state.bodyString;
        var headers = this.headersEditor ? this.headersEditor.getValue() : this.state.headersString;

        this.setState({
            isLoading: true,
            error: "",
            response: "",
            startTime: new Date()
        });

        fetch(this.state.url, {
            method,
            headers: this.props.token ? Object.assign(JSON.parse(headers), { authorization: 'Basic ' + this.props.token }) : JSON.parse(headers),
            body: method == "GET" ? null : body
        }).then((response) => {

            if (response.status >= 200 && response.status < 300) {
                response.text().then((text) => this.setState({
                    endTime: new Date(),
                    error: "",
                    response: text,
                    isLoading: false
                }))
            } else {
                response.text().then((text) => this.setState({
                    endTime: new Date(),
                    error: text && text.trim(/\n/),
                    isLoading: false
                }))
            }
        }).catch((result) => {
            this.setState({ isLoading: false, endTime: new Date(), result: result || 'Unauthorized' })
        })
    };

    componentWillReceiveProps(newProps) {
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


    render() {
        var { headers, method, body, url } = this.props.request;
        var duration = this.state.startTime && this.state.endTime && this.state.endTime.valueOf() - this.state.startTime.valueOf() + 'ms';
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

                        <div tabLabel={"cURL"}>
                            <div>
                                <textarea value={this.getCurl()} ref="curl"/>
                                <button
                                    style={{ width: 200, marginTop:10, float: 'right' }}
                                    onClick={() => {
                                        this.setState({ copied: true })
                                        setTimeout(() => {
                                            this.setState({ copied: false })
                                        }, 2000)
                                    }}
                                    className="btn-copy"
                                    data-clipboard-text={this.getCurl()}>
                                    {this.state.copied ? 'Copied!' : 'Copy to clipboard'}
                                </button>

                            </div>
                        </div>

                        <div tabLabel={"Fetch"}>
                            <div>
                                <textarea value={this.getFetch()} ref="fetch"/>
                                <button
                                    style={{ width: 200, marginTop:10, float: 'right' }}
                                    onClick={() => {
                                        this.setState({ copied: true })
                                        setTimeout(() => {
                                            this.setState({ copied: false })
                                        }, 2000)
                                    }}
                                    className="btn-copy"
                                    data-clipboard-text={this.getFetch()}>
                                    {this.state.copied ? 'Copied!' : 'Copy to clipboard'}
                                </button>

                            </div>
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
                                <h2>Error - {duration}</h2>
                                <JSONText value={this.state.error}/>
                            </div>
                        )}
                        {this.state.response && (
                            <div className="error">
                                <h2>Response - {duration}</h2>
                                <JSONText value={this.state.response}/>
                            </div>
                        )}

                        <form onSubmit={this.sendRequest} className="flex-row">
                            <div className="flex-column">
                                {method}
                            </div>
                            <input type="text" className="url flex-1 flex-column" placeholder="url"
                                   value={this.state.url}
                                   onChange={(e) => this.setState({ url: e.currentTarget.value })}
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