import { serve } from 'https://deno.land/std/http/server.ts';
import { corsHeaders } from '../../shared/cors.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }
  try {
    // Parse the JSON body of the request
    const requestBody = await req.json();
    console.log(requestBody.query)
    // // Extract allergies, preferences, and message from the request body
    // const allergies = requestBody.allergies;
    // const preferences = requestBody.preferences;
    // const message = requestBody.message;
    const allergies = ["peanut"]
    const preferences = ["carrot","tomato"]
    const message ="I want a spegetti"

    var content = "This is a query from a recipe generation app."
    content += "Given the user have allergies of"
    for (const allergiesKey in allergies) {
      content += " " + allergiesKey
    }
    content += "And the user have preference of"
    for (const preference in preferences) {
      content += " " + preference
    }
    content += "and the user left a message of" + message
    content +=" you need to give me a recipe, the first line of your response should be the title of this recipe." +
        "and then you need to give me all the ingredients of this recipes, every ingredients a line,the ingredient name, a number of quantity and then the unit,divided by a space. for example:sugar 1 teaspoon" +
        "and then the procedures in this recipe, every procedures a line"

    const sent_message = {
      messages: [{"role": "system", "content": "You are a helpful assistant."},
        {"role": "user",
          "content": content}],
      model: "gpt-3.5-turbo",
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

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: {...corsHeaders, 'Content-Type': 'application/json' },status:200
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
