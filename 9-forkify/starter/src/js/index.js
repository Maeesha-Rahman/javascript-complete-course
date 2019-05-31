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
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import { elements, renderLoader, clearLoader } from './views/base';

// global state of the app
    // search object - where we have search query and search results and this will be part of the state
    // current recipe object 
    // also want shopping list object
    // and liked recipes
const state = {};
window.state = state;

// ** SEARCH CONTROLLER **
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

        try {
            // 4. search for recipes
            await state.search.getResults(); // returns a promise

            // 5. render results on UI
            clearLoader();
            searchView.renderResults(state.search.result);

        } catch (error) {
            alert('Something went wrong with the search...');
            clearLoader();
        }
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

// ** RECIPE CONTROLLER **

const controlRecipe = async () => {
    // get ID from url
    // replace the # symbol with nothing to remove it so we get the actual id we need
    const id = window.location.hash.replace('#', '');
    console.log(id);

    // if we have an id
    if (id) {
        // prepare UI for changes
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        // highlight selected search item
        // if there was a search 
        if (state.search) searchView.highlightSelected(id);

        // create new recipe object
        state.recipe = new Recipe(id);

        try {
            // get recipe data and parse ingredients
            // want this to happen asynchronously as getRecipe will return a promise
            // since we used 'await' have to change controlRecipe function to an -async- function
            await state.recipe.getRecipe();
            console.log(state.recipe.ingredients);
            state.recipe.parseIngredients();

            // calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // render recipe 
            clearLoader();
            recipeView.renderRecipe(state.recipe);

        } catch (error) {
            alert('Error processing recipe');
        }  
    }
};

// window.addEventListener('hashchange', controlRecipe);
// window.addEventListener('load', controlRecipe);

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));

// LIST CONTROLLER 
const controlList = () => {
    // create a new list if there is none yet
    if (!state.List) state.list = new List();

    // add each ingredient to the list and UI
    state.recipe.ingredients.forEach(el => {
        // save the item since it was returned from addItem() method
        const item = state.list.addItem(el.count, el.unit, el.ingredient);
        listView.renderItem(item);
    });
};

// handle delete and update list item events 
elements.shopping.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;

    // handle the delete button 
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        // delete from state
        state.list.deleteItem(id);
        // delete from UI
        listView.deleteItem(id);
        // handle the count update
    } else if (e.target.matches('shopping__count-value')) {
        // e.target is the value that was clicked 
        // value property will get the value of the number
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});

// handling recipe button clicks
elements.recipe.addEventListener('click', e => {
    // if the target matches the class or any of its child elements 
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        // decrease button is clicked
        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        // increase button is clicked
        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    }
    // console.log(state.recipe);
});


window.l = new List();