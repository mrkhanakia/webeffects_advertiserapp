import React, { Component } from 'react';
import ReactDom from 'react-dom';

import FileInput from './FileInput'
import TrouwenRouteInput from './TrouwenRouteInput'
import {UtilHelper} from 'helpers'

class ProjectTabCatForm extends Component {
    constructor(props) {
        super(props);

   
    }

    static defaultProps = {
        reset: false,
        project_id : null,
        project_formdata: [],
        geleghendens: [],
        item : [],
        attachment_mappings: [],
        onAttachmentDeleted: function(){},
        onAttachmentTitleUpdated: function(){},

        trouwenroute_description: null,
        trouwenroutes: [],

        compare_json: []
        
    }

    componentWillMount() {
       
    }

    componentDidMount() {
        
    }


    componentDidUpdate() {
        
    }

    render() {
        const item = this.props.item;
        let fvm = _.find(this.props.geleghendens, { 'filter_value_id': item.value });
        fvm = undefined==fvm ? [] : fvm;
        // console.log("this.props.geleghendensthis.props.geleghendensthis.props.geleghendens", this.props.geleghendens)
       
        if(undefined==fvm.description) {
            $(this.refs.description).trumbowyg('html', "");    
        } else {
            $(this.refs.description).trumbowyg('html', fvm.description);
        }

        var fileinput_tooltip_template = _.template(trans.pageProject_catform_fileinput_tooltip_note);
        var fileinput_tooltip = fileinput_tooltip_template({ 'cat_title': item.title });

        var cat_tooltip_template = _.template(trans.pageProject_tooltip_algemene_beschrijving);
        var cat_tooltip = fileinput_tooltip_template({ 'cat_title': item.title });
        

        const class_description = UtilHelper.compareJsonGetClass('fv_description_'+item.value, this.props.compare_json);
        const class_attachments = UtilHelper.compareJsonGetClass('fv_attachments_'+item.value, this.props.compare_json);

        return (
            <div>
                <input type="hidden" name={`geleghendens[${item.value}][filter_value_id]`} defaultValue={item.value} />
                <div className="form-group">
                    <label className={class_description}>{trans.pageProject_catform_title} {item.title}
                        <a href="#" className="popoverData question-mark-icon" data-toggle="popover" data-trigger="hover" data-placement="bottom" data-html="true" data-content={cat_tooltip}></a>
                    </label>
                    <textarea className="editor" ref="description" name={`geleghendens[${item.value}][description]`} defaultValue={fvm.description}></textarea>
                </div>
                <div className="form-group">
                    <FileInput 
                        reset={this.props.reset} 
                        project_id={this.props.project_id}
                        className={class_attachments}
                        heading = {trans.pageProject_catform_fileinput_heading}
                        heading_empty = {trans.pageProject_catform_fileinput_heading_empty}
                        tooltip_note = {fileinput_tooltip}
                        name={`geleghendens[${item.value}][attachments]`} 
                        filter_value_id={item.value} 
                        onAttachmentDeleted={this.props.onAttachmentDeleted} 
                        onTitleUpdated={this.props.onAttachmentTitleUpdated} 
                        items={fvm.attachments} />
                </div>

                <div className="form-group">
                    {
                        item.is_trouwen ?
                            <TrouwenRouteInput 
                                compare_json= {this.props.compare_json}
                                trouwenroute_description= {this.props.trouwenroute_description}
                                items= {this.props.trouwenroutes}
                                />
                        : ''
                    }
                </div>
            </div>
        )
    }
}


export default ProjectTabCatForm;
