import { wishList, loadingEl, createMeal, getData } from "./script.js";
// API: www.themealdb.com/api/json/v1/1/lookup.php?i=52772

// Getting favorite DOM element
const fav_meals = document.getElementById("fav_meals");

// Loading favourite meals from wishList to DOM using api
async function loadWishList() {
    // Loading the wish List
    for (let id of wishList) {
        fav_meals.appendChild(await createFavMeal(id));
    }
}

// Function to create Favourite section meal
async function createFavMeal(mealId) {
    // Start Loading
    fav_meals.appendChild(loadingEl);

    // Fetching Data
    const data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
    const mealData = data.meals[0];

    // Stop loading
    fav_meals.removeChild(loadingEl);

    // Creating meal to append in Home DOM
    const mealEl = createFavMealElement(mealData);

    // Appending meal to the fav list DOM
    return mealEl;
}

function createFavMealElement(mealData) {
    const mealEl = createMeal(mealData);
    const mealId = mealData.idMeal;

    // Adding remove fav button functionality
    const favBtn = mealEl.querySelector("#add_to_fav");
    favBtn.onclick = async event => {
        event.stopPropagation(); // Stops propagation event from parent and thus stops the page from redirecting
        const ok = confirm(`Do you want to remove "${mealData.strMeal}" from Favorites.`);
        // confirm(`Do you want to remove "${mealData.strMeal}" from Favorites.`);
        if (ok) {
            // removing from wishlist
            const index = wishList.findIndex(id => id === mealId);
            wishList.splice(index, 1);
            // Updating loacal storage
            localStorage["wishListKey"] = JSON.stringify(wishList);
            // Remove the element
            fav_meals.removeChild(mealEl);
            //Update fav_list for search
            updateFavList();
        }
    };
    return mealEl;
}

// Load Wishlist
loadWishList();

/////////////////////////////////////////////////////////////////////////
// Searching your favorite meal
const search_fav = document.getElementById("search_fav");
const search_btn = document.getElementById("search_btn");

// Fav list for searching
const fav_list = new Set();
async function updateFavList() {
    fav_list.clear();
    for (let id of wishList) {
        //Fetching data
        const data = await getData(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        const mealData = data.meals[0];
        //Storing in favlist
        fav_list.add(mealData);
    }
}

await updateFavList();

//Searching on key up
search_fav.onkeyup = () => {
    search_in_favlist();
};
//Searching on pressing search button
search_btn.onclick = () => {
    search_in_favlist();
};

//Search Function
async function search_in_favlist() {
    fav_meals.textContent = "";
    // Getting data from searchbar
    const search_str = search_fav.value.toLowerCase();

    for (let mealData of fav_list) {
        if (mealData.strMeal.toLowerCase().includes(search_str)) {
            fav_meals.appendChild(createFavMealElement(mealData));
        }
    }
}
