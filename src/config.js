import Env from './env.json'

const env_current = Env[Env.current]
export const ROOT_HOST = env_current.root_host;
export const ROOT_URL = env_current.root_url;
export const API_HOST = env_current.api_host;
export const API_URL = env_current.api_url;

export const OBJECT_TYPE_PROJECT = 'project';

export const SIGN_UP_URL = ROOT_URL + '/#/signup';
export const FORGET_PWD_URL = ROOT_URL + '/#/forgetpwd';
export const RESET_PWD_URL = ROOT_URL + '/#/resetpwd';
export const RESET_PWD_AJAX = API_URL + '/postReset';
export const FORGET_PWD_AJAX = API_URL + '/postEmail';

export const API_URL_PUBLIC = API_URL+'/public';

export const API_URL_SIGNIN = API_URL+'/auth/signin';
export const API_URL_SIGNIN_CONFIRM_ACCOUNT = API_URL+'/auth/signin_confirm_account';
export const API_URL_SIGNUP = API_URL+'/auth/signup';
export const API_URL_CHANGE_PWD = API_URL+'/user/changepwd';
export const API_URL_UPDATE_USER = API_URL+'/user/update';

export const API_URL_USER = API_URL+'/user';

export const API_URL_PROJECT = API_URL+'/project';



