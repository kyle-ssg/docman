import React from 'react';
import _ from 'lodash';

module.exports = class extends React.Component {
    constructor (props, context) {
        super(props, context);
        this.state = { route: 'login', isLoading: true };
    }

    componentDidMount () {
        fetch('/api/' + (this.props.params.id || '0fa15f899a05c5d2f876'))
            .then((res)=>res.json())
            .then((res)=> {
                this.setState(Object.assign({}, {
                    isLoading: false,
                    selectedRequest: res.folders[0].requests[0]
                }, res));
            })
    }

    selectRequest = (selectedRequest) => this.setState({ selectedRequest })

    renderRequest = (request) => {
        return (
            <div onClick={()=>this.selectRequest(request)} className="request">
                <div className="container">
                    <div
                        className={"card " + request.method.toLowerCase() + (this.state.selectedRequest == request ? ' active' : '')}>
                        <span className="fg-primary">{request.method}</span> {request.name}
                        <div className="notes">
                            {request.url}
                        </div>
                    </div>
                </div>
            </div>
        )
    };

    renderSelectedRequest = (request) => {
        return request && (
                <div>

                    <div className="alert">
                        <h3>Request</h3>
                        <pre>
                            fetch(<span style={{color:'#7231FF'}}>{request.url}</span>, {
                            JSON.stringify({
                                headers: JSON.parse(request.headers),
                                method: request.method,
                                body: JSON.parse(request.body)
                            }, null, 1)
                        });</pre>
                    </div>
                </div>
            )
    }

    render () {
        var { folders } = this.state;

        return this.state.isLoading ? (
            <div className="centered-container">
                Loading...
            </div>
        ) : (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-7">
                            <h1>
                                {this.state.name}
                            </h1>
                            <p className="lead">
                                {this.state.description}
                            </p>
                            {folders.map((folder) => (
                                <div id={folder.id} className="collection">
                                    <div className="container">
                                        <h2>{folder.name}</h2>
                                        <p>{folder.description}</p>
                                    </div>
                                    {folder.requests.map(this.renderRequest)}
                                </div>
                            ))}
                        </div>
                        <div className="col-md-5 console">
                            {this.renderSelectedRequest(this.state.selectedRequest)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
};



//Keep me alive plz
var http = require("http");
setInterval(function() {
    http.get("https://dcmn.herokuapp.com/");
}, 300000); // every 5 minutes (300000)
