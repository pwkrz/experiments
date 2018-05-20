const MINI_AXIOS = (method, url, data = null) => {

    const RESP = new Promise( (resolve, reject) => {

        const XHR = new XMLHttpRequest();

        XHR.open(method, url, true);

        XHR.onreadystatechange = (xhrEvt) => {

            if (XHR.readyState === 4) {

                if(XHR.status === 200)
                 resolve(XHR.response);
                else
                 reject(`Error requesting resource at ${url}`);
             }
        }

        XHR.send(data);
    })


    return RESP;
}

export { MINI_AXIOS }