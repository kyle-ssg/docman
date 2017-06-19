import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
const TheComponent = class extends Component {
    displayName: 'TheComponent'

    selectRequest = (e) => {
        this.props.onClick(this.props.request);
    }

    render () {
        var { method, name, url, body } = this.props.request;
        var { isActive } = this.props;
        body = body && JSON.parse(body);
        return (
            <div id={this.props.id} href={"#"+this.props.id} onClick={this.selectRequest} className="request">

                    <div
                        className={"card " + method.toLowerCase() + (isActive ? ' active' : '')}>
                        <span className="fg-primary">{method}</span> {name}
                        <div className="notes">
                            {url}
                        </div>
                    </div>

            </div>
        );
    }
};

TheComponent.propTypes = {};

module.exports = TheComponent;
