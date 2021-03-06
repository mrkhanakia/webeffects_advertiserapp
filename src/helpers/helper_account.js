import { Link, hashHistory } from 'react-router'
import {
        ROOT_HOST,
        API_URL_RESET_PWD,
        API_URL_USER_SWITCH_SITE

    } from '../config.js'


import Auth from './auth.js'

export default class AccountHelper {
    constructor() {

    }
    static resetPassword(param) {
        return axios({
            method: 'post',
            url: API_URL_RESET_PWD ,
            // headers: Auth.header(),
            data : param,
        });
    }

    static switch_site(project_id=null) {
        var active_tab = localStorage.getItem('active_tab') || "general";
        return axios({
            method: 'post',
            url: API_URL_USER_SWITCH_SITE ,
            headers: Auth.header(),
            data : {
                token: Auth.getToken(),
                project_id: project_id
            },
        }).then((response) => {
            // console.log(response.data.url + "&active_tab="+active_tab);    
            // window.location.href = response.data.url;
            window.location.href = response.data.url + "&active_tab="+active_tab;
        }).catch(function (error) {
            toastr.error(trans.request_failed)
        });
    }
}

