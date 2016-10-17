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
      .then((collection)=> {

        collection.requests = _.map(collection.requests, (request)=> {
          var headers = request.headers.split(/\n/g);
          var headersObj = {};
          _.each(headers, function (header) {
            var parts = header.split(':');
            if (parts.length == 2) {
              headersObj[parts[0]] = parts[1].trim(' ');
            }
          });
          request.headers = JSON.stringify(headersObj, null, 2);
          return request;
        });

        var requestsById = _.keyBy(collection.requests, 'id');
        this.setState({
          isLoading: false,
          requests: requestsById,
          collection: collection
        });
      })
  }

  renderRequest = (id) => {
    var request = this.state.requests[id];
    console.log(request);
    return (
      <div className="request">
        <div className="container">
          <span style={{ fontSize: 16, color: '#666' }}>
        <span style={{
          color: 'rgb(212, 140, 68)',
          fontWeight: 'bold'
        }}>{request.method}</span> {request.name}
        </span>
          <div className="alert">
            {request.url}
          </div>
          <h4>BODY</h4>
          <div className="alert">
            <pre>{request.rawModeData}</pre>
          </div>
          <h4>Headers</h4>
          <div className="alert">
            <pre>{request.headers}</pre>
          </div>
          <h4>
            Try it in browser
          </h4>
          <div className="alert">
          <pre>
          fetch("{request.url}",
            {JSON.stringify({
              headers: JSON.parse(request.headers),
              method: request.method,
              body: JSON.parse(request.rawModeData)
            }, null, 2)}
            )
          </pre>
          </div>
        </div>
      </div>
    )
  }

  render () {
    var { collection } = this.state;

    return this.state.isLoading ? (
      <div className="centered-container">
        Loading...
      </div>
    ) : (
      <div style={{ marginTop: 20 }}>
        {collection.folders.map((folder) => (
          <div className="collection">
            <div className="container">
              <h2>{folder.name}</h2>
            </div>
            {folder.order.map(this.renderRequest)}
          </div>
        ))}
      </div>
    )
  }
};
