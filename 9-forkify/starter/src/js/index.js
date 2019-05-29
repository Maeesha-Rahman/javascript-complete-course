// Global app controller
// import string from './models/Search';

// import { add as a, multiply as m, ID } from './views/searchView';

// import everything as 
// import * as searchView from './views/searchView';
// console.log(`Using imported functions! ${searchView.add(searchView.ID, 2)} and ${searchView.multiply(3, 5)}. ${string}.`);

// console.log(`Using imported functions! ${a(ID, 2)} and ${m(3, 5)}. ${string}.`);

// import axios from 'axios';


// async function getResults(query) {
//     // axios automatically returns json, with fetch we had to convert it to json 
//     // axios is better at error handling than fetch
//     const key = '79bf64ca9abeccb654949508f44b28ae';
//     try {
//         // returns a promise 
//         const res = await axios(`https://www.food2fork.com/api/search?key=${key}&q=${query}`);
//         // log the result of the ajax call 
//         // console.log(res);
//         const recipes = res.data.recipes;
//         console.log(recipes);
//     } catch(error) {
//         alert(error);
//     }  
// }

// getResults('pizza');

// https://www.food2fork.com/api/search
// 79bf64ca9abeccb654949508f44b28ae

import Search from './models/Search';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

// global state of the app
    // search object - where we have search query and search results and this will be part of the state
    // current recipe object 
    // also want shopping list object
    // and liked recipes
const state = {};

const controlSearch = async () => {
    // 1. get query from view
    const query = searchView.getInput();
    console.log(query);

    // if there is a query 
    if (query) {
        // 2. new search object and add to state
        state.search = new Search(query);

        // 3. prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        // 4. search for recipes
        await state.search.getResults(); // returns a promise

        // 5. render results on UI
        clearLoader();
        searchView.renderResults(state.search.result);
    }
}

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

// const search = new Search('pizza');
// console.log(search);
// search.getResults();

// event delegation - put event handler on element that is already there on load, and try to figure out where click event happened so that we can take action

elements.searchResPages.addEventListener('click', e => {
    // The closest() method of the Element interface returns the closest ancestor of the current element (or the current element itself) which matches the selectors given in a parameter. If no such element exists, it returns null.
    // use the closest method to get the one with the class of .btn-inline 
    const btn = e.target.closest('.btn-inline');
    // e.target = exactly where this click happened (will show the html element that was clicked)
    // console.log(btn);
    
    // if there is a btn
    if (btn) {
        // can read the data attribute we dynamically typed in the html using .dataset and then name of data attribute (goto). the variable regarding the page number gets stored in the dataset.goto. we can replace 'goto' with anything we want in the html. the variable we get is a string '1' so we need to convert to a number using parseInt. set the base to 10 for num 0-9. 
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        // console.log(goToPage);
    }
});