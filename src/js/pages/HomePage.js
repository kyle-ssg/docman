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
        }, res));
      })
  }

  renderRequest = (request) => {
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
              body: JSON.parse(request.body)
            }, null, 2)}
            )
          </pre>
          </div>
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
      <div style={{ marginTop: 20 }}>
        {folders.map((folder) => (
          <div className="collection">
            <div className="container">
              <h2>{folder.name}</h2>
              <p>{folder.description}</p>
            </div>
            {folder.requests.map(this.renderRequest)}
          </div>
        ))}
      </div>
    )
  }
};
