export const cookies = {
    getCookieOptions: () => {
        return {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 1000 * 60 * 15, // 15 minutes  
        };
},
    set: (res, name, value, options) => { 
        const cookieOptions = { ...cookies.getCookieOptions(), ...options };
        res.cookie(name, value, cookieOptions);
    },

    clear: (res, name, options= {}) => {
        res.clearCookie(name, {...cookies.getCookieOptions(), ...options});
    },

    get: (req, name) => {
        return req.cookies[name];
    }
};