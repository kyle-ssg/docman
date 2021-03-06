import React from 'react';
import RequestFull from '../RequestFull';
import RequestSummary from '../RequestSummary';
import sampleJSON from '../sample';
module.exports = class extends React.Component {
    constructor(props, context) {
        super(props, context);
        const environmentIndex = this.props.location.query.env && parseInt(this.props.location.query.env) || 0;
        this.state = {
            route: 'login',
            environmentIndex,
            isLoading: true
        };
    }

    componentDidMount() {
        if (this.props.params.id) {
            fetch('/api/' + (this.props.params.id))
                .then((res) => res.json())
                .then((res) => {
                    this.setState(Object.assign({}, {
                        isLoading: false,
                        selectedRequest: res.folders[0].requests[0],
                        environment: res.environments[this.state.environmentIndex],
                    }, res), function () {
                        if (document.location.hash) {
                            $("html, body").animate({ scrollTop: $(document.location.hash).offset().top }, 1000);
                        }
                    });
                })
        } else {
            this.setState(Object.assign({}, {
                isLoading: false,
                selectedRequest: sampleJSON.folders[0].requests[0]
            }, sampleJSON));
        }
    }

    generateURL = (url) => {
        if (this.state.environment) {
            return url.replace(this.state.environments[0].url, this.state.environment.url);
        }
        return url
    };

    selectRequest = (selectedRequest) => {
        this.setState({ selectedRequest });
    }

    setEnvironment = (e) => {
        this.setState({
            environment: this.state.environments[parseInt(e.currentTarget.value)],
            environmentIndex: parseInt(e.currentTarget.value)
        })
    };

    render() {
        var { requiresAuth, folders, name, isLoading, environments, description, selectedRequest } = this.state;
        return (
            <div>
                <div>
                    {isLoading ? '...' : (
                            <div>
                                <div className="main-header">
                                    <h1>
                                        {name}

                                    </h1>
                                    {environments &&
                                    <select value={this.state.environmentIndex} className="form-control select-large"
                                            onChange={this.setEnvironment}>
                                        {environments.map((en, i) => (
                                            <option value={i}>{en.name}</option>
                                        ))}
                                    </select>
                                    }
                                </div>
                                <div className="left">
                                    <div className="intro">
                                        <p className="lead">
                                            {description || "Download Postman Collection"} <a alt="Download" target="_blank"
                                                             href={"https://www.getpostman.com/collections/" + this.props.params.id}><span className="fa fa-download"></span></a>
                                        </p>
                                        {requiresAuth && (
                                            <div>
                                                <input onChange={(e) => this.setState({ token: e.currentTarget.value })}
                                                       type="text" placeholder="Bearer Token"/>
                                            </div>
                                        )}
                                    </div>
                                    {folders && folders.map((folder) => (
                                        <div id={folder.id} className="collection">

                                            <h2>{folder.name}</h2>
                                            <p>{folder.description}</p>

                                            {folder.requests.map((request, i) =>
                                                <RequestSummary
                                                    id={folder.name+'_'+'_'+request.name+'_'+request.method}
                                                    generateURL={this.generateURL}
                                                    onClick={this.selectRequest}
                                                    request={Object.assign({}, request, { url: this.generateURL(request.url) })}
                                                    isActive={selectedRequest == request}/>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                </div>
                <div className="right console">
                    {selectedRequest && (
                        <RequestFull
                            token={this.state.token}
                            request={Object.assign({}, selectedRequest, { url: this.generateURL(selectedRequest.url) })}/>
                    )}
                </div>
            </div>
        )
    }
};


//Keep me alive plz
var http = require("http");
setInterval(function () {
    http.get("https://dcmn.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
