import React from 'react';
import RequestFull from '../RequestFull';
import RequestSummary from '../RequestSummary';
import sampleJSON from '../sample';
module.exports = class extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = { route: 'login', isLoading: true };
    }

    componentDidMount () {
        if (this.props.params.id) {
            fetch('/api/' + (this.props.params.id))
                .then((res)=>res.json())
                .then((res)=> {
                    this.setState(Object.assign({}, {
                        isLoading: false,
                        selectedRequest: res.folders[0].requests[0]
                    }, res));
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
            environment: this.state.environments[parseInt(e.currentTarget.value)]
        })
    };


    render () {
        var { folders, name, isLoading, environments, description, selectedRequest } = this.state;
        return (
            <div>
                <div className="left">
                    {isLoading ? '...' : (
                        <div>
                            <h1>
                                {name}
                                {environments &&
                                <select className="select-large" onChange={this.setEnvironment}>
                                    {environments.map((en, i)=>(
                                        <option value={i}>{en.name}</option>
                                    ))}
                                </select>
                                }
                            </h1>

                            <p className="lead">
                                {description}
                            </p>
                            {folders && folders.map((folder) => (
                                <div id={folder.id} className="collection">
                                    <div className="container">
                                        <h2>{folder.name}</h2>
                                        <p>{folder.description}</p>
                                    </div>
                                    {folder.requests.map((request)=>
                                        <RequestSummary
                                            key={request.url}
                                            generateURL={this.generateURL}
                                            onClick={this.selectRequest}
                                            request={Object.assign({}, request, { url: this.generateURL(request.url) })}
                                            isActive={selectedRequest == request}/>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="right console">
                    {selectedRequest && (
                        <RequestFull
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
