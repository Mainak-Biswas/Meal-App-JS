import { getData, createMeal, loadingEl } from "./script.js";

// To check that no repeat occurs
const presentHomeSet = new Set();

//Initial loading and Lazy Loading
const home = document.getElementById("home");

// Function to load home screen data when scrolled
export async function loadHomeData() {
    //Initial 10 random data to fill the home screen
    let diff = home.offsetHeight - home.scrollHeight;
    while (diff > 0) {
        await createRandomHomeMeal();
        diff = home.offsetHeight - home.scrollHeight;
    }

    home.onscroll = async () => {
        if (
            Math.floor(home.scrollTop) >=
            Math.floor(home.scrollHeight - home.offsetHeight) + 28 - 1
        ) {
            await createRandomHomeMeal();
        }
    };
}

// Creating Random Meal form Home DOM object
async function createRandomHomeMeal() {
    // Start Loading
    home.appendChild(loadingEl);

    // Fetching Data
    const data = await getData("https://www.themealdb.com/api/json/v1/1/random.php");
    const mealData = data.meals[0];

    // Checking if meal is already present in the DOM
    if (presentHomeSet.has(mealData.idMeal)) {
        // If present stop loading and return
        home.removeChild(loadingEl);
        return;
    } else {
        presentHomeSet.add(mealData.idMeal);
    }
    // Creating meal to append in Home DOM
    const meal = createMeal(mealData);

    // Stop loading
    home.removeChild(loadingEl);

    // Appending meal to the Home DOM
    home.appendChild(meal);
}
