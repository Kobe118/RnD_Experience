import { serve } from 'https://deno.land/std/http/server.ts';
import { corsHeaders } from '../../shared/cors.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js'

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


Deno.serve(async (req) => {
  // if (req.method === 'OPTIONS') {
  //   return new Response('ok', { headers: corsHeaders })
  // }

  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp0Y3Fj' +
      'cHR6dWF6a3F0bWNwc3h3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5OTk3NjMsImV4cCI6MjAxMTU3NTc2M30.5cif3sm' +
      'YXD88DMcwjimkQ0LDlmDGmKa6-A7smgjdPP4';
  const supabase = createClient(
      Deno.env.get('URL') ?? '',
      Deno.env.get('ANON_KEY') ?? '',
      { global: { headers: { Authorization: supabaseKey } } }
  )
  try {
  //   const { data:recipes, error } = await supabase.from('recipe').select('name')
  //
  //   // Parse the JSON body of the request
  //   const requestBody = await req.json();
  //   // // Extract allergies, preferences, and message from the request body
  //   const allergies = requestBody.allergies;
  //   const preferences = requestBody.preferences;
  //   const message = requestBody.message;
  //   var content = "please respond to me in the format i gave you later, dont add anything extra\n"
  //   content+= "I am trying to generate recipes with you and insert your data directly into database,please all recipe name and ingredient name and unit in camelCase"
  //   content += "required format(just a example):\n"
  //   content += "recipe:recipeName\n Ingredients: roastedPeanuts,1/2,cup,riceVinegar,1,tablespoon..........\n"
  //   content+= "Steps:\n1. Cut the chicken into bite-sized pieces.\n2. In a bowl, mix soy sauce, rice vinegar, and cornstarch to create a marinade.\n3. Marinate the chicken in the mixture for 30 minutes.\n4........."
  //   content+= "remember that user have allergies of:"
  //   for (const allergy in allergies) {
  //     content+= " "
  //     content+= allergy
  //   }
  //   content+= ".\n remember that user have preferences of:"
  //   for (const preference in preferences) {
  //     content+= " "
  //     content+=preference
  //   }
  //   content+= ".\n remember that user want to leave you a message:"
  //   content+= message
  //   content+=".\n remember you need to avoid these recipes that is already in my database"
  //   for (const recipe in recipes) {
  //     content+=recipe
  //   }
  //
  //   const sent_message = {
  //     messages: [{"role": "system", "content": "You are a helpful assistant."},
  //       {"role": "user",
  //         "content": content}],
  //     model: "gpt-4",
  //   };
  //
  //   const response = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(sent_message),
  //   });
  //
  //   if (!response.ok) {
  //     const errorBody = await response.text(); // Get the response body as text
  //     throw new Error(`Failed to fetch from OpenAI: ${response.status} - ${errorBody}`);
  //   }
  //******************response analysis************
  //   const data = await response.json();
  //   const choices = data.choices
  //   const contentGpt = choices[0].message.content; // Your GPT-4 response
  //   const sections = contentGpt.split('\n');
  //   const recipeName = sections[0].split(':')[1];
  //
  //   const rawIngredients = sections[1].split(':')[1].split(',');
  //   const ingredients: Ingredient[] = [];
  //
  //   for (let i = 0; i < rawIngredients.length; i += 3) {
  //     ingredients.push({
  //       name: rawIngredients[i],
  //       quantity: parseFloat(rawIngredients[i + 1]),
  //       unit: rawIngredients[i + 2]
  //     });
  //   }
  //
  //   const steps = sections.slice(2).join('\n');
  //
  //   const r: Recipe = {
  //     name: recipeName,
  //     ingredients,
  //     steps
  //   };
  //
  //   const formattedRecipe = formatRecipe(r);
  //   console.log(formattedRecipe);

//**********inserting into database*******************

    // const { data:d1, error:e1 } = await supabase
    //     .from('recipe')
    //     .insert([
    //       { 'name': r.name, 'manual': r.steps },
    //     ])
    //     .select()
    //
    // for (const ingredient of r.ingredients) {
    //   let { data: inow, error: e2 } = await supabase
    //       .from('ingredient')
    //       .select("*")
    //       .ilike('name', ingredient.name);
    //
    //   if (inow && inow.length === 0) {
    //     const { data, error: e3 } = await supabase
    //         .from('ingredient')
    //         .insert([{ 'name': ingredient.name }])
    //         .select();
    //     console.log("New data inserted", data, ingredient.name);
    //   } else if (inow) {
    //     console.log('Data found:', inow);
    //   } else if (e2) {
    //     console.error('Error:', e2);
    //   }
    // }

    const { data, error:e1 } = await supabase
        .from('users')
        .insert([
          { 'name': "a", 'first_name': "b" },
        ])
        .select()



    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' },status:200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
});
