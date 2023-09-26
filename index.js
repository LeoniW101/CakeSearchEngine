'use strict';

const cakeRecipes = require("./cake-recipes.json");
//////////////
//1 searchRecipes 
const searchRecipes = (recipes, searchParams) => {
let recipesMatches = cakeRecipes;
//1.1 Authors
  if ("authors" in searchParams) {
    recipesMatches = recipesMatches.filter(recipe => {
      return searchParams.authors.some(author => {
        // if author is null
        if (Object.is(recipe.Author, null)) {
        } else {
          return recipe.Author.toLowerCase().includes(author.toLowerCase());
        };
      });
    });
  };

//1.2 Ingredients
  if ("ingredients" in searchParams) {
    recipesMatches = recipesMatches.filter(recipe => {
    // convert Ingredients Object to String
      return searchParams.ingredients.every(ingredient => recipe.Ingredients.toString().includes(ingredient.toLowerCase()));
    });
  };

//1.3 Search terms
  if ("searchTerms" in searchParams) {
    recipesMatches = recipesMatches.filter(recipe => {
    const searchTerms = searchParams.searchTerms.split(" ");
      return searchTerms.every(searchTerm => {
        // if Description is null
        if (Object.is(recipe.Description, null)) {
        } else {
          return recipe.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            recipe.Description.toLowerCase().includes(searchTerm.toLowerCase());
        };
      });      
    });
  }
  
  return recipesMatches;
};

// 2 printRecipes
const printRecipes = (matchingRecipes) => {
  console.log(`We found ${matchingRecipes.length} matching recipes!\n`);
  console.log("----------------------------------------------------- \n");
  matchingRecipes.forEach(recipe => {
    console.log(`Recipe name: ${recipe.Name}.\n`);
    console.log(`Author: ${recipe.Author}.\n`);
    console.log(`Description: \n${recipe.Description}.\n`);
    console.log(`Ingredients: \n${recipe.Ingredients}.\n`);
    console.log("--------------------------------------------------- \n");
  })
};



// If you're ready to test: uncomment the code below.
// printRecipes(searchRecipes(cakeRecipes, {})); // 162
// printRecipes(searchRecipes(cakeRecipes, { ingredients: ["carrot"] })); // 3
// printRecipes(searchRecipes(cakeRecipes, { authors: ["Good food"] })); // 32
// printRecipes(searchRecipes(cakeRecipes, { searchTerms: "christmas simple" })); // 5
// printRecipes(
//     searchRecipes(cakeRecipes, {
//         ingredients: ["nuts"],
//        searchTerms: "christmas simple",
//     })
// ); // 2
// printRecipes(
//     searchRecipes(cakeRecipes, {
//         authors: ["best", "cook"],
//         ingredients: ["syrup"],
//         searchTerms: "brunch pancakes",
//     })
// ); // 2

//const searchParams = {
//  ingredients: ["carrot", "butter"]
// }; 