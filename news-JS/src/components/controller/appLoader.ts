import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        const apiUrl = process.env.API_URL || '';
        const apiKey = process.env.API_KEY || '';

        super(apiUrl, { apiKey });
    }
}

export default AppLoader;
