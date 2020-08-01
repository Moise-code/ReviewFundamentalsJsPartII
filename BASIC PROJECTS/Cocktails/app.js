import showDrinks from './utils/presentDrink.js';
import './utils/searchForm.js';


const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=a';

window.addEventListener('DOMContentLoaded', () => {
    showDrinks(URL);
});




