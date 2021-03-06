import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router'

import ProjectsLinkList from './ProjectsLinkList'
class Sidebar extends Component {
    constructor(props, context) {
        super(props, context);
    }

    static defaultProps = {
        project_list: []
    }

    componentDidMount() {
        var plwH = window.innerHeight - 250;
        jQuery(".projects-list-wrapper").height(plwH);
    }
 
    render() {
        const logoStyle = {
            backgroundImage: 'url(' + Env.logo_path_white + ')',
        };
        return (
            <div className="comp-sidebar">
                <div className="logo" style={ logoStyle}>
                </div>
                <div className="projects-list-wrapper">
                    <ProjectsLinkList project_list={this.props.project_list} />
                </div>

                <Link to="/project/add" className="btn btn-green btn--round btn--add"><i className="iconc-plus mr10"></i>{trans.sidebar_voeg_link}</Link>
            </div>
        );
    }
}


export default Sidebar;
