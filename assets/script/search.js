// Search API : https://www.themealdb.com/api/json/v1/1/search.php?s=search_str

import { getData, createMeal, loadingEl } from "./script.js";
import { loadHomeData } from "./home.js";

// Geetting dom elements for search
const home = document.getElementById("home"); //To display search data
const home_link = document.getElementById("home_link"); // To display title as Home/Search Result
const search_bar = document.getElementById("search"); //SearchBar
const search_btn = document.getElementById("search_btn"); //Search Button

// Adding keyup functionality to search bar
search_bar.onkeyup = () => {
    searchMeal();
};
// Adding click functionality to search button
search_btn.onclick = () => {
    searchMeal();
};

//Adding searchMeal to window loading
window.onload = () => {
    searchMeal();
};

//The search Function
async function searchMeal() {
    const search_str = search_bar.value.toLowerCase();

    if (search_str === "") {
        home_link.textContent = "Home";
        home.textContent = "";
        await loadHomeData();
    } else {
        home_link.textContent = "Search Result";
        home.textContent = "";
        // Start Loading
        home.appendChild(loadingEl);

        // Fetching Data
        const data = await getData(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${search_str}`,
        );
        const meals = data.meals;

        for (let mealData of meals) {
            // Creating meal to append in Home DOM
            const meal = createMeal(mealData);

            // Appending meal to the Home DOM
            home.appendChild(meal);
        }

        // Stop loading
        home.removeChild(loadingEl);
    }
}
