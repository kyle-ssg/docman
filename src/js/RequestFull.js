import React, {Component, PropTypes} from 'react';
import Tabs from './Tabs';
import Button from './Button';

const TheComponent = class extends Component {
    displayName: 'TheComponent'


    constructor (props, context) {
        super(props, context);
        this.state = {
            tab: 1,
            bodyString: this.props.request && this.props.request.body,
            headersString: this.props.request && this.props.request.headers,
            url: this.props.request && this.props.request.url,
        };
    }

    selectTab = (tab)=>{
        this.setState({ tab },()=>{
            if (tab == 0 && !this.headersInitialized) {
                this.editor = CodeMirror.fromTextArea(this.refs.headers, {
                    lineWrapping: true,
                    lineNumbers: true,
                    textWrapping: true,
                    indentWithTabs: true,
                    readOnly: false,
                    foldGutter: true,
                    mode: "application/json",
                    matchBrackets: true,
                    autoCloseBrackets: true,
                    gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
                    lint: true,
                    theme: 'base16-dark',
                });
                this.headersInitialized = true;
            }
        });

    }

    componentDidMount = () => {
        this.editor = CodeMirror.fromTextArea(this.refs.body, {
            lineWrapping: true,
            lineNumbers: true,
            textWrapping: true,
            indentWithTabs: true,
            readOnly: false,
            foldGutter: true,
            mode: "application/json",
            matchBrackets: true,
            autoCloseBrackets: true,
            gutters: ["CodeMirror-lint-markers", "CodeMirror-foldgutter"],
            lint: true,
            theme: 'base16-dark',
        });

    }

    componentWillReceiveProps (newProps) {
        if (newProps.request !== this.props.request) {
            var bodyString = newProps.request.body;
            this.editor.getDoc().setValue(bodyString);
        }
    }


    render () {
        var { headers, method, body, url } = this.props.request;
        return (
            <div>
                <div className="alert">
                    <h3>Request</h3>
                    <Tabs value={this.state.tab} onChange={this.selectTab}>
                        <div tabLabel={"Headers"}>
                            <textarea value={this.state.headersString} ref="headers"
                                      onChange={(headerString)=>this.setState({ headersString })}/>
                        </div>
                        <div tabLabel={"Body"}>
                             <textarea value={this.state.bodyString} ref="body"
                                       onChange={(bodyString)=>this.setState({ bodyString })}/>
                        </div>
                    </Tabs>

                    <div className="flex-row fixed-bottom">

                        <input type="text" className="url flex-1 flex-column" placeholder="url" value={this.state.url}
                               onChange={(url)=>this.setState({ url })}
                        />

                        <div className="text-right flex-column">
                            <Button className="btn">
                                Send
                            </Button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;