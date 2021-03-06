import React, { PropTypes } from 'react'

import DropdownList from '../DropdownList'
import CheckboxListDropdown from '../CheckboxListDropdown'

import ProjectItems from './ProjectItems'
import SnoobiGraph from './SnoobiGraph'
import StatisticTabList from './StatisticTabList'

class SnoobiPage extends React.Component {

    constructor(props) {
        super(props);
    }

    static defaultProps = {
        user_actions_list: [],
        data : {},
        // list: [],
        // graph: [],
        // snoobi_most_requested_projects: [],
        onSortItemChange: function(item){},
        onMonthItemChange: function(item){},
        onFilterChange: function(filters){},
        onStatisticTabListPaginate: function(page) {},
    }

    componentWillMount() {

    }

    componentDidMount() {
     

    }

    componentDidUpdate() {
    
    }


    render() {

        // console.log('this.props.data SNOOOBBBB', this.props.data);
        var a = moment('2016-10-01');
        var b = moment();

        const countSortMonth = [];
        countSortMonth.push({
            "value": 0, 
            "title": trans.snoobiPage_placeholder_select_filter_date, 
        })
        for (var m = moment(a); m.isBefore(b); m.add('months', 1)) {
            // console.log(m.format('YYYY-MM-DD'));
            countSortMonth.push({
                "value": m.format('YYYY-MM-DD'), 
                "title": m.format('MMMM YYYY'), 
            })
        }

        // const countSortMonth = [
        //     {"value": "feb", "title": 'februari 2016'},
        //     {"value": "maar", "title": 'maart 2016'},
        //     {"value": "april", "title": 'april 2016'},
        //     {"value": "mei", "title": 'mei 2016'}
        // ]
        const countSortRecent = [
            {"value": "date", "title": trans.snoobiPage_sort_recente},
            {"value": "name", "title": trans.snoobiPage_sort_alfabet}
        ];

        let warning_msg = _.template(trans.snoobiPage_warning_msg);
        warning_msg = warning_msg({'average_visit_count' : this.props.data.average_visit_count});

        return (
            <div className="statistieken-wrapper">
                <div className="form-group">
                    {<div className="row">
                        <div className="form-group no-margin-bottom col-md-12">
                            <label>{trans.snoobiPage_uw_advertentie}
                                <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={trans.pageProject_tooltip_uw_advertentie}></a>
                            </label>
                        </div>
                    </div>}
                    <div className="row">
                        <div className="col-md-12">
                            {/*{<div className="left-col mb20">
                                <CheckboxListDropdown items={this.props.user_actions_list}  onItemChange={this.props.onFilterChange} emptyPlaceholder={trans.snoobiPage_placeholder_select_filter_action} />
                            </div>}*/}
                            <div className="right-col11 mb20 snoobiSorten-wrapper">
                                <div className="sorteren-inner ">
                                    <span className="mr15 sorten-text">{trans.snoobiPage_sorten_text}</span>
                                    
                                    <span className="wp250 mr10 mb20 dropdown-inline">
                                        <DropdownList items={countSortMonth} selectedValue={""} onItemChange={this.props.onMonthItemChange} emptyPlaceholder={trans.snoobiPage_placeholder_select_filter_date}/>
                                    </span>
                                    {/*{<span className="wp170 dropdown-inline">
                                        <DropdownList items={countSortRecent} selectedValue={"date"} onItemChange={this.props.onSortItemChange} />
                                    </span>}*/}
                                    
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <StatisticTabList items={this.props.data.list} onPaginate={this.props.onStatisticTabListPaginate} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <ProjectItems items={this.props.data.list_mostrequested_project} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <SnoobiGraph data={this.props.data.list_graph} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            {/*<div className="warning-message my30">{warning_msg}</div>*/}
                            <div className="form-group mt30">
                                <label className="mt10">{trans.snoobiPage_snoobi_img_title}</label>
                            </div>
                            <div className="snoobi-wrapper">
                                <div className="img-wrapper"></div>
                                <p dangerouslySetInnerHTML={{__html:trans.snoobiPage_snoobi_img_desc}}></p>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        ) 
    }
}
SnoobiPage.propTypes = {
    
};

export default SnoobiPage