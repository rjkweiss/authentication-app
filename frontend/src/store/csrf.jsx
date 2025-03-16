import Cookies from 'js-cookie';

const csrfFetch = async (url, options = {}) => {
    // set method to GET if none has been provided
    options.method = options.method || 'GET';

    // set headers to empty if not provided
    options.headers = options.headers || {};

    // add credentials include
    options.credentials = 'include';

    // for non-GET routes, set XSRF token and content type headers
    if (options.method.toUpperCase() !== 'GET') {
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
        options.headers['XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
    }

    // call the window's fetch
    const res = await window.fetch(url, options);

    // check for errors
    if (res.status >= 400) throw res;

    return res;
};

export default csrfFetch;
