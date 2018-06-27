export var GLOBAL = {
    APP_VERSION: '1.0',
    API_URL: 'http://desaifamily.qseksolutions.com/api/v1',
    API_HEADER: 'a2309455-13c0-4b5a-b9c1-5e9e65dc0704',
    IS_LOGGEDIN: localStorage.getItem("is_loggedin")?true:false,
    USER: JSON.parse(localStorage.getItem("is_loggedin")),
    AVATAR: 'assets/img/default-user-avatars.png',
};