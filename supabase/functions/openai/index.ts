import { serve } from 'https://deno.land/std/http/server.ts';
import { corsHeaders } from '../../shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js'
import { resize } from "https://deno.land/x/deno_image/mod.ts";


interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  name: string;
  ingredients: Ingredient[];
  steps: string;
}

function formatRecipe(recipe: Recipe): string {
  let formattedRecipe = `Recipe Name: ${recipe.name}\n\n`;

  formattedRecipe += 'Ingredients:\n';
  recipe.ingredients.forEach(ingredient => {
    formattedRecipe += `- ${ingredient.name} ${ingredient.quantity} ${ingredient.unit}\n`;
  });

  formattedRecipe += '\nSteps:\n';
  formattedRecipe += recipe.steps;

  return formattedRecipe;
}



function extractAndParseJSON(responseString) {
  // Find the start and end index of the JSON content
  const startIndex = responseString.indexOf('{');
  const endIndex = responseString.lastIndexOf('}') + 1;

  if (startIndex === -1 || endIndex === -1) {
    console.error("JSON content not found in the response.");
    return;
  }

  // Extract the JSON string
  const jsonString = responseString.substring(startIndex, endIndex);

  // Parse the JSON string
  try {
    const jsonData = JSON.parse(jsonString);
    console.log("Extracted JSON Data:", jsonData);
    return jsonData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
}


Deno.serve(async (req) => {
  // if (req.method === 'OPTIONS') {
  //   return new Response('ok', { headers: corsHeaders })
  // }

  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
      "eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Y3FjcHR6dWF6a3F0bW" +
      "Nwc3h3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY5NTk5O" +
      "Tc2MywiZXhwIjoyMDExNTc1NzYzfQ.IOXs53-E-fFBoog9F5IDyzy2f" +
      "2xYpyAu_3SBY8gRDew";
  const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { global: { headers: { Authorization: supabaseKey } } }
  )
  try {
    console.log(Deno.env.get('SUPABASE_SERVICE_ROLE_KEY'))
    //****************************data preperation**********************************
    const requestBody = await req.json();
    // // Extract allergies, preferences, and message from the request body
    const userAllergies = requestBody.allergies;
    const preferences = requestBody.preferences;
    const message = requestBody.message;
    const { data:recipes, error:recipeError } = await supabase.from('recipe').select('name')
    let exist_recipes = [];
    for (let i = 0; i < recipes.length; i++) {
        exist_recipes.push(recipes[i].name);
      }
    const {data:allergieSources, error:allergieError} = await supabase.from('allergie').select('allergie')
    let allergie_sources = [];
    for (let i = 0; i < allergieSources.length; i++) {
      allergie_sources.push(allergieSources[i].allergie);
    }
    //**************content********************
    var content = "Please add all the possible allergy sources in the allgergySources part" +
        "Given the possible allergy sources from our database be aware that you dont have to a" +
        "void them but respond to me if the allergy sources exist in the recipe["+ allergie_sources.join(", ") +"] " +
        "the allergies from the user that you should avoid[" + userAllergies.join(", ") + "], " +
        "also the user dont like [" + preferences.join(", ") +
        "], and the message from the user '" + message +
        "', please generate a recipe avoiding [" + exist_recipes.join(", ") +
        "]. Format the response in JSON with the following structure: recipe name,allergySources, ingredients (amount, unit, name), and steps. " +
        "Ingredients should be basic (e.g., 'beans' instead of 'frozenBeans') and in camelCase, " +
        "the allergySources is the allergySources in the recipe you generated. please keep the content in pure json format so that i can directly json.parse your reply";

      content += " Example format: \n";
      content += `{
    "recipeName": "exampleRecipe",
    "allergySources": ["Milk","Tree Nuts"],
    "ingredients": [
      {"amount": "1/2", "unit": "cup", "name": "roastedPeanuts"},
      {"amount": "1", "unit": "tablespoon", "name": "riceVinegar"},
      ...
    ],
    "steps": [
      "Cut the chicken into bite-sized pieces.",
      "In a bowl, mix soy sauce, rice vinegar, and cornstarch to create a marinade.",
      ...
    ]
  }`;
      console.log(content)

    const sent_message = {
      messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user",
          "content": content}],
      model: "gpt-4-1106-preview",
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(sent_message),
    });

    if (!response.ok) {
      const errorBody = await response.text(); // Get the response body as text
      throw new Error(`Failed to fetch from OpenAI: ${response.status} - ${errorBody}`);
    }
  //******************response analysis************
    const data = await response.json();
    console.log(data)
    const choices = data.choices
    const contentGpt = extractAndParseJSON(choices[0].message.content); // GPT-4 response
    console.log(contentGpt)

    // Validate the response format
    if (!contentGpt.recipeName || !Array.isArray(contentGpt.ingredients) || !Array.isArray(contentGpt.steps) || !Array.isArray(contentGpt.allergySources)) {
      console.error("Response does not meet the required format");
      return;
    }
    console.log("content correct")

    // Extract data
    const recipeName = contentGpt.recipeName;
    const ingredients = contentGpt.ingredients.map(ingredient => ({
      amount: ingredient.amount,
      unit: ingredient.unit || '',  // Default to empty string if unit is not provided
      name: ingredient.name
    }));
    const steps = contentGpt.steps;
    const allergies = contentGpt.allergySources;

    // Further processing can be done here, like storing the data into variables or database
    console.log("Recipe Name:", recipeName);
    console.log("Ingredients:", ingredients);
    console.log("Steps:", steps);
    console.log("Allergies",allergies);

//**********inserting into database*******************
//     **********insert recipe*****************
    const { data:recipe_insert_result, error:e1 } = await supabase
        .from('recipe')
        .insert([
          { 'name': recipeName, 'manual': steps.join("\n").toString() },
        ])
        .select()
    console.log("recipe inserted", recipe_insert_result)
    //***************insert ingredients and relations*************
    for (let i = 0; i < ingredients.length; i++) {
      const {data:sameIngredient, error:e2} = await supabase
          .from('ingredient')
          .select("*")
          .ilike('name',ingredients[i].name)
      if(sameIngredient && sameIngredient.length == 0){
        const { data:ingredient_insert_result, error: e3 } = await supabase
            .from('ingredient')
            .insert([{ 'name': ingredients[i].name }])
            .select();

        const { data:ingredient_recipe_insert_result, error: e4 } = await supabase
            .from('ingredient_in_recipe')
            .insert([{ 'recipe': recipe_insert_result[0].id,'ingredient':ingredient_insert_result[0].id,'quantity':ingredients[i].amount,'unit':ingredients[i].unit }])
            .select();
      }
      else if (sameIngredient) {
        const { data:ingredient_recipe_insert_result, error: e5 } = await supabase
            .from('ingredient_in_recipe')
            .insert([{ 'recipe': recipe_insert_result[0].id,'ingredient':sameIngredient[0].id,'quantity':ingredients[i].amount,'unit':ingredients[i].unit }])
            .select();
      }
      else if (e2) {
        console.error('Error:', e2);
      }
    }
    //****************insert allergies relations**********************
    for (let i = 0; i < allergies.length; i++){
      const {data:sameAllergy,error:e6} = await supabase
          .from('allergie')
          .select("*")
          .ilike('allergie',allergies[i]);
      if (sameAllergy&&sameAllergy.length == 1){
        const { data:allergy_recipe_insert_result,error:e7} = await supabase
            .from('allergie_in_recipe')
            .insert([{'allergie':sameAllergy[0].id,'recipe':recipe_insert_result[0].id}])
            .select();
      }
    }

    // ********************generate images*****************
    const prompt = "I want you to generate a recipe image for a recipe generation application, the image should be as realistic as possible"+
        "recipe name:"+recipeName
        // "Steps: "+ steps.join("\n").toString()
        // +"keep the image size smaller than 500kb";
    const image_generation_message = {
      model:"dall-e-3",
      prompt:prompt,
      size:"1024x1024",
      quality:"standard",
      n:1
    };
    const imageResponse = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(image_generation_message),
    });
    const jsonResponse = await imageResponse.json();
    console.log(jsonResponse);
    const url = jsonResponse.data[0].url
    console.log(url)
    const bucketName = 'recipes_thumbnail_and_picture';
    const fileName = recipe_insert_result[0].id+'.jpg'; // or .png, etc.
    const supabase2 = createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )
    try {
      // Fetch the image from the URL
      const imageRes = await fetch(url);
      const arrayBuffer = await imageRes.arrayBuffer();
      const imgUint8Array = new Uint8Array(arrayBuffer);

      const resizedImage = await resize(imgUint8Array, { width: 512, height: 512 });

      const imageBlob = new Blob([resizedImage], { type: 'image/jpeg' });

      // Upload the image to Supabase Storage
      const { data, error } = await supabase2.storage
          .from(bucketName)
          .upload(fileName, imageBlob);

      if (error) {
        throw error;
      }

      // Continue processing with the uploaded data
      console.log('Upload successful:', data);
    } catch (error) {
      console.error('Error during file upload:', error);
    }




    return new Response(JSON.stringify({ id: recipe_insert_result[0].id }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
