import axios from 'axios';
import mlabCreds from './mlab.credentials';

const axiosMlab = axios.create({

    baseURL: 'https://api.mlab.com/api/1/databases/real-democracy/collections',

    params: {
        apiKey: mlabCreds.api_key
      },

});

axiosMlab.defaults.headers.post['Content-Type'] = 'application/json';

export default axiosMlab;