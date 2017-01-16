import React, { Component } from 'react';
import ReactDom from 'react-dom';

import {UserHelper, AccountHelper} from '../../helpers'


class ChangePasswordForm extends Component {
    constructor(props) {
        super(props);

        this.msg_btn_save_text = trans.contactForm_msg_btn_save_text
        this.msg_heading = trans.contactForm_msg_heading
    }

    static defaultProps = {
        onDataUpdate: function(org) { },
        
        popup_id: '',
        settings : {},

        layout: '',
        token: '',
        email: '',

        is_new : true,
    }

    componentWillMount() {
        if(!this.props.is_new) {
            this.msg_btn_save_text = trans.contactForm_update_msg_btn_save_text
            this.msg_heading = trans.contactForm_update_msg_heading
        }
    }

    componentDidMount() {
        var _this = this;
        this.validatorFn();
        this.validator = jQuery(this.refs.form).validate({
            rules: {
                password: {
                    required: true,
                    minlength: 6,
                    ContainsAtLeastOneCapitalLetter: true,
                    ContainsAtLeastOneDigit: true,
                },
                password_confirmation: {
                    // equalTo: "#password"
                }
            },

            // errorPlacement: function(error) {
            //     console.log(error)
            //     _this.showPasswordPopover()
            //     _this.showPasswordConfirmationPopover()
            // },

            success: function(label) {
              _this.showPasswordPopover()
              _this.showPasswordConfirmationPopover()
            },
        });


    }

    hidePopup = () => {
        if (this.props.popup_id) {
            jQuery('#' + this.props.popup_id).popup('hide');
        }
    }


    validatorFn() {
        jQuery.validator.addMethod(
            'ContainsAtLeastOneDigit',
            function (value) { 
                return /[0-9]/.test(value); 
            },  
            'Your password must contain at least one digit.'
        );
        jQuery.validator.addMethod(
            'ContainsAtLeastOneCapitalLetter',
            function (value) { 
                return /[A-Z]/.test(value); 
            },  
            'Your password must contain at least one capital letter.'
        );    

        $.validator.prototype.ruleValidationStatus = function( element ) {
            element = $(element)[0];
            var rules = $(element).rules();
            var errors ={};
            for (var method in rules ) {
                var rule = { method: method, parameters: rules[method] };
                try {
                    var result = $.validator.methods[method].call( this, element.value.replace(/\r/g, ""), element, rule.parameters );

                    errors[rule.method] = result ;

                } catch(e) {
                    console.log(e);
                }
            }
            return errors;
        } 

    }

    _error_Password(error_object) {
        var html = '';

        if(error_object.minlength==true) {
            html += '<div><i class="fa fa-check"></i> Minstens 8 karakters.</div>';
        } else {
            html += '<div><i class="fa fa-times"></i> Minstens 8 karakters.</div>';
        }

        if(error_object.ContainsAtLeastOneCapitalLetter==true) {
            html += '<div><i class="fa fa-check"></i> Minstens 1 hoofdletter.</div>';
        } else {
            html += '<div><i class="fa fa-times"></i> Minstens 1 hoofdletter.</div>';
        }

        if(error_object.ContainsAtLeastOneDigit==true) {
            html += '<div><i class="fa fa-check"></i> Minstens 1 cijfer.</div>';
        } else {
            html += '<div><i class="fa fa-times"></i> Minstens 1 cijfer.</div>';
        }

        // jQuery(this.refs.password).data('bs.popover').options.content = html;
    
        return html;
    }

    showPasswordPopover = () => {

        var errors_password_field = this.validator.ruleValidationStatus(jQuery(this.refs.password)); 
        var html = this._error_Password(errors_password_field);

        if(!jQuery(this.refs.password).data('bs.popover')) {
            jQuery(this.refs.password).popover({
                html: true,
                container: 'body',
                trigger: 'manual',
                placement: 'right',
                content: function() {
                    var message = '<div class="password_field_errors">'+html+'</div>';
                    return message;
                }
            });
            jQuery(this.refs.password).popover("show");
        }

        jQuery(".password_field_errors").html(html);
    }


    _error_PasswordConfirmation(error_object) {
        var html = '';

        if(error_object.equalTo==true) {
            html += '<div><i class="fa fa-check"></i> Minstens 8 karakters.</div>';
        } else {
            html += '<div><i class="fa fa-times"></i> Minstens 8 karakters.</div>';
        }

        return html;
    }


    showPasswordConfirmationPopover = () => {
        let $elem = jQuery(this.refs.password_confirmation)
        var errors_password_field = this.validator.ruleValidationStatus($elem); 
        var html = this._error_PasswordConfirmation(errors_password_field);

        if(!$elem.data('bs.popover')) {
            $elem.popover({
                html: true,
                container: 'body',
                trigger: 'manual',
                placement: 'right',
                content: function() {
                    var message = '<div class="password_confirmation_field_errors">'+html+'</div>';
                    return message;
                }
            });
            $elem.popover("show");
        }

        jQuery(".password_confirmation_field_errors").html(html);
    }

    handleSubmit_Layout1 = (e) => {
        e.preventDefault();
        var _this = this;

        var valid = jQuery(this.refs.form).valid();
        this.showPasswordPopover()
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();

        UserHelper.changePasswordFirstlogin(data).then(function(response) {
            this.props.onDataUpdate(response.data)
            this.hidePopup();
        }.bind(this));

        return false;
    }


    handleSubmit_Layout2 = (e) => {
        e.preventDefault();
        var _this = this;

        var valid = jQuery(this.refs.form).valid();
        this.showPasswordPopover()
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();

        UserHelper.changePasswordFirstlogin(data).then(function(response) {
            this.props.onDataUpdate(response.data)
            this.hidePopup();
        }.bind(this));

        return false;
    }


    handleSubmit_Layout3 = (e) => {
        e.preventDefault();
        var _this = this;

        var valid = jQuery(this.refs.form).valid();
        this.showPasswordPopover()
        if (!valid) {return false};
        
        let data = jQuery(this.refs.form).serialize();

        AccountHelper.resetPassword(data).then(function(response) {
            this.props.onDataUpdate(response.data)
            this.hidePopup();
        }.bind(this));

        return false;
    }


    
    // this layout used on where advertiser logins in first time so he much change password this form will show in popup
    _render_layout1() {
        return (
            <div>
                <div className="modal-header">
                    <h4 className="modal-title">{this.msg_heading}</h4>
                </div>

                <form className="form" ref='form' onSubmit={this.handleSubmit_Layout1}>
                    
                    <div className="content-area mt10">
                        

                        <div className="form-group">
                            <label className="">{trans.account_uw_nieuwe_wachtwoord}</label>
                            <input type="password" className="form-control" name="password" id="password" ref="password"  placeholder="••••••••••" />
                            
                        </div>
                        <div className="form-group">
                            <label className="">{trans.account_noogmaals}</label>
                            
                            <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" ref="password_confirmation" placeholder="••••••••••"/>
                            
                        </div>

                    </div>
                    <div className="modal-footer text-right">
                        <button type="submit" className="btn btn-green btn--round">{trans.account_bevestig_btn}</button>
                    </div>
                </form>

            </div>
        );
    }

    // this layout used on Account Page
    _render_layout2() {
        return (
            <div>
                <div className="formstyle1Ct changepwdCt">
                    <form className="form-horizontal formstyle1 ChangepwdForm" ref='form' onSubmit={this.handleSubmit_Layout2}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group">
                                    <label className="col-sm-12">{trans.account_uw_oude_wachtwoord}</label>
                                    <div className="col-sm-12">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
                                            <input type="password" className="form-control required" name="oldpassword" id="oldpassword" ref="oldpassword"  placeholder="••••••••••" />
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-12">{trans.account_uw_nieuwe_wachtwoord}</label>
                                    <div className="col-sm-12">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
                                            <input type="password" className="form-control required" name="password" id="password" ref="password"  placeholder="••••••••••" />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-12"><div className="row"><div className="col-sm-12">{trans.account_noogmaals}</div></div></label>
                                    <div className="col-sm-12">
                                        <div className="input-group">
                                            <div className="input-group-addon"><i className="fa fa-key" aria-hidden="true"></i></div>
                                            <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" ref="password_confirmation" placeholder="••••••••••"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <button type="submit" className="btn btn-green btn--round">{trans.account_bevestig_btn}</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }


    // this layout used on ForgotPassword Page
    _render_layout3() {
        return (
            <div className="row formstyle1Ct">    
                <h3 className="form_title text-center">{trans.resetpwd_title}</h3>
                <form className="form-horizontal formstyle1 ForgetpwdForm" ref='form' onSubmit={this.handleSubmit_Layout3}>
                    <input type="hidden" name="token" defaultValue={this.props.token}/>
                    <input type="hidden" name="email" defaultValue={this.props.email}/>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label className="col-sm-12">{trans.resetpwd_nieuw}</label>
                                <div className="col-sm-12">
                                    <input type="password" className="form-control required" name="password" id="password" ref="password"  placeholder="••••••••••" />
                                    <div className="passworderror errordiv"></div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-12"><div className="row"><div className="col-sm-12">{trans.resetpwd_herhaal}</div></div></label>
                                <div className="col-sm-12">
                                    <input type="password" className="form-control required updatePassword" name="password_confirmation" id="password_confirmation" ref="password_confirmation" placeholder="••••••••••"/>
                                    <div className="passwordconfirmerror errordiv"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <button type="submit" className="btn btn-grey btn--round">{trans.resetpwd_submit_btn}</button>
                    </div>
                </form>
            </div>  
        );
    }

    render() {
        if(this.props.layout=="layout1") {
            return this._render_layout1()
        } if(this.props.layout=="layout2") {
            return this._render_layout2()
        } else {
            return this._render_layout3()
        }
    }
}


export default ChangePasswordForm;