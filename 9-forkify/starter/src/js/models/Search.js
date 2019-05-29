// export default 'I am an exported string.';
import axios from 'axios';
import { key } from '../config';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    // asynchronous method of this class 
    async getResults() {
        // axios automatically returns json, with fetch we had to convert it to json 
        // axios is better at error handling than fetch
        // const key = '79bf64ca9abeccb654949508f44b28ae'; (stored in config.js)
        try {
            // returns a promise 
            const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            // log the result of the ajax call 
            // console.log(res);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch(error) {
            alert(error);
        }  
    }
}



