const Endpoints = {
    STATUS : '/status',
    SETTINGS: `/config`,
    PINS: `/config/pins`,
    AUTH: {
        LOGIN: `/auth`,
        LOGOUT: '/logout',
        REGISTRATION: `/registration`
    },
    WIFI: "/status/wifi"
};

export default Endpoints;