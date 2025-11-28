const Endpoints = {
    STATUS : '/status',
    SETTINGS: `/config`,
    PINS: `/config/pins`,
    AUTH: {
        LOGIN: `/auth/auth`,
        LOGOUT: '/auth/logout',
        REGISTRATION: `/auth/registration`
    },
    WIFI: "/status/wifi"
};

export default Endpoints;