/**
 * Created by kylejohnson on 30/07/2016.
 */
import React from 'react'
import _ from 'lodash';
const Tabs = class extends React.Component {
    displayName: 'Tabs'

    render () {
        var children = _.filter(this.props.children, (i)=>i);
        return (
            <div className="tabs">
                <div className="tabs-nav">
                    {children && children.map((child, i)=> {
                        if (!child) return null;
                        var isSelected = this.props.value == i;
                        return (
                            <button
                                key={'button' + i}
                                onClick={()=>this.props.onChange(i)}
                                className={"btn-tab btn-primary" + (isSelected ? ' tab-active' : '')}>
                                {child.props.tabLabel}
                            </button>
                        );
                    })}
                </div>
                <div className="tab-line" style={{
                    width: 100 / children.length + "%",
                    left: 100 / children.length * this.props.value + "%"
                }}/>
                <div className="tabs-content">
                    {children.map((child, i)=> {
                        var isSelected = this.props.value == i;
                        return (
                            <div key={'content' + i} className={'tab-item' + (isSelected ? ' tab-active' : '')}>
                                {child}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
};

Tabs.defaultProps = {
    className: '',
    value: 0
};

module.exports = Tabs;

//Example Usage
//   <Tabs value={this.state.tab} onChange={this.selectTab}>
//     <div tabLabel={(<span className="fa fa-phone tab-icon"/>)}>
//       <h2>Tab 1 content</h2>
//     </div>
//     <div tabLabel={(<span className="fa fa-phone tab-icon"/>)}>
//       <h2>Tab 2 content</h2>
//     </div>
//   </Tabs>
