import React, {Component, PropTypes} from 'react';
import {Link, IndexLink} from 'react-router';

const Header = class extends Component {
    displayName: 'Header';

    render () {
        return (
            <div>
                <nav className="navbar navbar-light bg-faded">
                    <IndexLink to="/" className="navbar-brand" href="#">Brand</IndexLink>

                </nav>
            </div>
        );
    }
};

module.exports = Header;
