import { connect } from 'react-redux'

import {PageProjectOverview} from '../components'
const mapStateToProps = (state) => {
    return {
        state : state,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch
    }
}


const ProjectOverviewContainer = connect(mapStateToProps, mapDispatchToProps)(PageProjectOverview)

export default ProjectOverviewContainer
