import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
const TheComponent = class extends Component {
    displayName: 'TheComponent'

    selectRequest = () => {
        this.props.onClick(this.props.request);
    }

    render () {
        var { method, name, url, body } = this.props.request;
        var { isActive } = this.props;
        body = body && JSON.parse(body);
        console.log(body)
        return (
            <div onClick={this.selectRequest} className="request">
                <div className="container">
                    <div
                        className={"card " + method.toLowerCase() + (isActive ? ' active' : '')}>
                        <span className="fg-primary">{method}</span> {name}
                        <div className="notes">
                            {url}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;