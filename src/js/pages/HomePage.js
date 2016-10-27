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

    selectRequest = (selectedRequest) => {
        this.setState({ selectedRequest });
    }

    render () {
        var { folders, name, isLoading, description, selectedRequest } = this.state;
        return (
            <div>
                <div className="left">
                    {isLoading ? '...' : (
                        <div>
                            <h1>
                                {name}
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
                                            onClick={this.selectRequest}
                                            request={request}
                                            isActive={selectedRequest == request}/>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="right console">
                    {selectedRequest && (
                        <RequestFull request={selectedRequest}/>
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
