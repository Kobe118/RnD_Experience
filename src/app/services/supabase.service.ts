import { Injectable } from '@angular/core'
import { Recipe,IngredientDetail, RecipeNew } from '../recipe/recipe.model'
import { Profile } from '../profile/profile.model'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js'
import { environment} from "../environments/environment/environment";
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    supabase: SupabaseClient
    _session: AuthSession | null = null
    private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor() {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
      console.log("USER:", this.getLocalUser());
    }
    //User Authentication
    async signUp(credentials: { email: string; password: string; options: object}) {
        return new Promise(async (resolve, reject) => {
          const { error, data } = await this.supabase.auth.signUp(credentials);
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session
        })
        return this._session
    }

    get currentUser(): Observable<User> {
        return this._currentUser.asObservable();
    }

    get currentUserValue(): User | null {
        return this._currentUser.value;
    }

    profile(user: User) {
        console.log(user.id)
        return this.supabase
            .from('users')
            .select(`name, first_name`)
            .eq('id', user.id)
            .single()
    }

    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback)
    }

    signIn(credentials: { email: string; password: string }) {
        return new Promise(async (resolve, reject) => {
          const { error, data } = await this.supabase.auth.signInWithPassword(
            credentials
          );
          this._currentUser.next(data?.user); // pass the user to the currentUser BehaviorSubject
    
          if (error) {
            reject(error);
          } else {
            const refreshToken = data.session.refresh_token;
            const account = data.user;
            this.setRefreshToken(refreshToken);
            this.setLocalUser(account)
            resolve(data);
          }
        });
    }

    private setRefreshToken(token: string): void {
      localStorage.setItem('token', token);
    }
    private setLocalUser(account: User): void{
      const userString = JSON.stringify(account);
      localStorage.setItem('user', userString);
    }
    
    private getLocalUser(): User | null {
      const userString = localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    }

    async getUserId(){
      const userString = localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
    }

    signOut() {
    // Remove the stored session from LocalStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._currentUser.next(null);
      return this.supabase.auth.signOut();
    }

    updateProfile(profile: Profile) {
        return this.supabase.from('users').update(profile).eq('id',profile.id)
    }

    async getUserPictureUrl(filename: string) {
        const { data } = this.supabase
            .storage
            .from('profile_pictures')
            .getPublicUrl(filename);
        return data.publicUrl;
    }

    isLoggedIn() {
        // this function is used to check if the user is logged in which will be used in auth.guard.ts to protect the routes from unauthorized access
        if(this.getLocalUser() !== null){
          this._currentUser.next(this.getLocalUser());
        }
        const user = this._currentUser.getValue(); // get the current value of the BehaviorSubject
        console.log('user: ', user);
        
        return !!user; // if user is not null or undefined, return true else return false
      }

      async getUpcomingRecipes(){
        try {
          console.log('userID: ', this._currentUser.getValue().id);
          const { data, error } = await this.supabase
            .rpc('get_upcoming_recipes', {
              user_uuid: this._currentUser.getValue().id
            });
          if (error) {
            console.error(error);
            throw error;
          } else {     
            return Object.values(data); // Assuming data is an array of Recipe objects
          }
        } catch (error) {
          console.error('Error fetching recipes:', error);
          throw error;
        }
      }

    //Recipes
    async getPreferredRecipes(){
      try {
        console.log('Preferred userID: ', this._currentUser.getValue().id);
        const { data, error } = await this.supabase
          .rpc('get_preferred_recipes', {
            user_uuid: this._currentUser.getValue().id
          });
          if (error) {
            console.error(error);
            throw error;
          } else {     
            return Object.values(data); // Assuming data is an array of Recipe objects
          }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
      }
    }

    async getImageUrl(id: string) {
      const { data } = this.supabase
          .storage
          .from('recipes_thumbnail_and_picture')
          .getPublicUrl(id+'.jpg')

      return data.publicUrl;
    }

    async reviewRecipe(recipeId:string,score:number){
        const userId = this._currentUser.getValue().id;
        const { data: existingReviews, error: selectError } = await this.supabase
            .from('recipe_review')
            .select('*')
            .eq('recipe', recipeId)
            .eq('user', userId);

        if (selectError) {
            console.error(selectError);
            return;
        }
        if (existingReviews && existingReviews.length > 0) {
            const { data: updatedData, error: updateError } = await this.supabase
                .from('recipe_review')
                .update({ score: score })
                .match({ recipe: recipeId, user: userId })
                .select();
                console.log(updatedData)
            if (updateError) {
                console.error(updateError);
            }
        } else {
            const { error: insertError } = await this.supabase
                .from('recipe_review')
                .insert([{ recipe: recipeId, user: userId, score: score }]);

            if (insertError) {
                console.error(insertError);

            }
        }
    }

    async postRecipeData(input: any) {
        console.log("sent_message");
        console.log(JSON.stringify(input))
        let {data,error} = await this.supabase.functions.invoke('openai',{body:JSON.stringify(input)})
        if (error) throw error;
        console.log(data)
        return data.id;
    }

    async getLikedRecipes():Promise <Recipe[]>{
        let userId = this._currentUser.getValue().id;

        let { data: recipe, error } = await this.supabase
            .from('recipe_review')
            .select('recipe')
            .eq('user',userId)
            .eq('score',5);
        if (recipe){
            const recipeIds = recipe.map(a=>a.recipe);

            let { data: newrecipe } = await this.supabase
                .from('recipe')
                .select('id,name,made_by,manual')
                .order('id', { ascending: false })
                .in('id',recipeIds)
            console.log("recipeID")
            console.log(newrecipe?.length)
            return newrecipe as Recipe[];
        }
        if (error) throw error;
        return []
    }

    async getDislikedRecipes():Promise <Recipe[]>{
        let userId = this._currentUser.getValue().id;

        let { data: recipe, error } = await this.supabase
            .from('recipe_review')
            .select('recipe')
            .eq('user',userId)
            .eq('score',0);
        if (recipe){
            const recipeIds = recipe.map(a=>a.recipe);

            let { data: newrecipe } = await this.supabase
                .from('recipe')
                .select('id,name,made_by,manual')
                .order('id', { ascending: false })
                .in('id',recipeIds)
            console.log("recipeID")
            console.log(newrecipe?.length)
            return newrecipe as Recipe[];
        }
        if (error) throw error;
        return []
    }

    async getOtherRecipes(likedRecipes: Recipe[], unlikedRecipes: Recipe[]): Promise<Recipe[]> {
        let { data, error:e } = await this.supabase
            .rpc('get_five_random_recipes', {
                user_id:this._currentUser.getValue().id
            })
        if (e) console.error(e)
        else console.log(data)
        const recipeIds = data.recipes.map((recipe: RecipeNew) => recipe.recipe);
        let { data: otherRecipes, error } = await this.supabase
            .from('recipe')
            .select('id, name, made_by, manual')
            .order('id', { ascending: false })
            .in('id', recipeIds)
            .limit(5);
        // If there's an error, throw it
        if (error) throw error;

        // Return the fetched recipes or an empty array if none were found
        return otherRecipes as Recipe[] || [];
    }

    async getRecipeById(recipe_id:string){
        let { data: recipe, error } = await this.supabase
            .from('recipe')
            .select('id,name,made_by,manual')
            .eq('id',recipe_id)
            .limit(1);
        if (error) throw error;
        return recipe;
    }

    async GetLikedRecipes(date:string, family_uuid:string) {
        let { data, error } = await this.supabase
            .rpc('get_three_liked_recipes', {
                date,
                family_uuid
            })
        if (error) {
             console.error(error);
            return [];
         } else {
             console.log(data);
            return Object.values(data);
         }
  }

    async GetNonLikedRecipes(date:string, family_uuid:string) {
        let { data, error } = await this.supabase
            .rpc('get_three_non_liked_recipes', {
                 date,
                 family_uuid
             })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    //MealPlan
    async CreateMealPlan(family_uuid:string, week:string) {
        let { data, error } = await this.supabase
            .rpc('create_empty_mealplan', {
                family_uuid,
                week
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async AddToMealPlan(day_of_week:string, mealplan:string, recipe:string) {
        let { data, error } = await this.supabase
            .rpc('insert_recipe_into_mealplan', {
                day_of_week,
                mealplan,
                recipe
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async getRecipeAllergies(recipe_id: string) {
        let allergies: string[] = [];

        try {
            let { data: allergies_id, error: recipeError } = await this.supabase
                .from('allergie_in_recipe')
                .select('allergie')
                .eq('recipe', recipe_id);
            if (recipeError|| !allergies_id) throw recipeError;
            console.log("get allergies"+allergies_id.length)
            const allergieIds = allergies_id.map(a=>a.allergie);
            let { data: allergiesData, error: allergiesError } = await this.supabase
                .from('allergie')
                .select("allergie")
                .in('id', allergieIds);
            if (allergiesError) throw allergiesError;
            if(allergiesData)
                allergies = allergiesData.map(a => a.allergie);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
        console.log(allergies); 
        return allergies;
    }

    async getRecipeIngredients(recipe_id: string): Promise<IngredientDetail[]> {
        let ingredientsWithDetails: IngredientDetail[] = [];
        try {
            let { data: ingredientsInfo, error: ingredientsError } = await this.supabase
                .from('ingredient_in_recipe')
                .select('ingredient, quantity, unit')
                .eq('recipe', recipe_id);
            if (ingredientsError || !ingredientsInfo) throw ingredientsError;
            console.log("Ingredient IDs:", ingredientsInfo);
            const ingredientIds = ingredientsInfo.map(a => a.ingredient);
            let { data: ingredientsData, error: dataError } = await this.supabase
                .from('ingredient')
                .select("id, name")
                .in('id', ingredientIds);
            if (dataError) throw dataError;
            if (ingredientsData && ingredientsData.length > 0) {
                ingredientsWithDetails = ingredientsInfo.map(ingredientInfo => {
                    // @ts-ignore
                    const ingredientData = ingredientsData.find(i => i.id === ingredientInfo.ingredient);
                    return {
                        name: ingredientData ? ingredientData.name : 'Unknown', 
                        quantity: ingredientInfo.quantity,
                        unit: ingredientInfo.unit
                    };
                });
            } else {
                console.log("No ingredient data found");
            }
        } catch (error) {
            console.error("Error fetching ingredients:", error);
        }
        console.log("Ingredients with details:", ingredientsWithDetails); // 调试输出
        return ingredientsWithDetails;
    }

    //User Profile
    async uploadFile(file: File,user: User): Promise<{ path: string }> {
        try {
            const { data, error } = await this.supabase.storage
                .from('profile_pictures')
                .upload(user.id+'.jpg', file, { upsert: true });

            if (error) {
                throw error;
            } else {
                return data; // Assuming 'data' contains the { path: string } structure
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            throw error;
        }
    }

    async getUserAllergies() {
        let allergies: string[] = [];
        const userid = this._currentUser.getValue().id;
        try {
            let { data: allergiesInfo, error: ingredientsError } = await this.supabase
                .from('user_has_allergie')
                .select('allergie')
                .eq('user', userid);
            if (ingredientsError || !allergiesInfo) throw ingredientsError;
            const allergieIds = allergiesInfo.map(a => a.allergie);
            let { data: allergiesData, error: dataError } = await this.supabase
                .from('allergie')
                .select("allergie")
                .in('id', allergieIds);
            if (dataError) throw dataError;
            if(allergiesData)
                allergies = allergiesData.map(a => a.allergie);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
        console.log(allergies);
        return allergies;
    }

    async getUserDislikes() {
        let dislikes: string[] = [];
        const userid = this._currentUser.getValue().id;
        try {
            let { data: dislikesInfo, error: ingredientsError } = await this.supabase
                .from('user_has_dislike')
                .select('dislike')
                .eq('user', userid);

            if (ingredientsError || !dislikesInfo) throw ingredientsError;
            const ingredientIds = dislikesInfo.map(a => a.dislike);
            let { data: allergiesData, error: dataError } = await this.supabase
                .from('ingredient')
                .select("name")
                .in('id', ingredientIds);
            if (dataError) throw dataError;
            if(allergiesData)
                dislikes = allergiesData.map(a => a.name);
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
        console.log(dislikes);
        return dislikes;
    }


    async getAllergies() {
      let allergies: any[] = [];

        try {
            const { data: allergiesData, error: allergiesError } = await this.supabase
                .from('allergie')
                .select("*");

            if (allergiesError) {throw allergiesError;}
            if(allergiesData){
                return allergiesData;}
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
        console.log(allergies); 
        return [];
    }

    linkIngredientToUserDislikes(userId: string, ingredientId: string){
        return this.supabase
            .from('user_has_dislikes')
            .insert({ user_id: userId, ingredient_id: ingredientId });
    }

    linkAllergieToUserAllergies(userId: string, allergieId: string){
        return this.supabase
            .from('user_has_allergies')
            .insert({ user_id: userId, ingredient_id: allergieId });
    }

    async linkIngredientToUserDislikes(userId: string, ingredientId: string): Promise<any> {
        try{
            const {data, error} = await this.supabase
            .from('user_has_dislike')
            .insert({ user: userId, dislike: ingredientId });
            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error inserting into user_has_allergies:', error);
            throw error; // Re-throw the error to handle it where the function is called
        }
    }

    async unlinkIngredientFromUserDislikes(userId: string, ingredientId: string): Promise<any> {
        try {
            const { error } = await this.supabase
                .from('user_has_dislike')
                .delete()
                .eq('user', userId)
                .eq('dislike', ingredientId);

            if (error) {
                throw error;
            }

            return; // Return nothing if successful
        } catch (error) {
            console.error('Error unlinking from user_has_allergies:', error);
            throw error;
        }
    }

    async linkAllergieToUserAllergies(userId: string, allergieId: string): Promise<any> {
        try {
            const { data, error } = await this.supabase
                .from('user_has_allergie')
                .insert({ user: userId, allergie: allergieId });

            if (error) {
                throw error;
            }

            return data;
        } catch (error) {
            console.error('Error inserting into user_has_allergies:', error);
            throw error; // Re-throw the error to handle it where the function is called
        }
    }

    async unlinkAllergieFromUserAllergies(userId: string, allergieId: string): Promise<any> {
        try {
            console.log("entering delte code");
            const { error } = await this.supabase
                .from('user_has_allergie')
                .delete()
                .eq('user', userId)
                .eq('allergie', allergieId);
            console.log("deleted Id", userId);
            console.log("deleted Allergy", allergieId);

            if (error) {
                throw error;
            }

            return; // Return nothing if successful
        } catch (error) {
            console.error('Error unlinking from user_has_allergies:', error);
            throw error;
        }
    }

    async getMealPlanInfo(mealplan:string) {
        let { data, error } = await this.supabase
            .rpc('get_recipes_in_mealplan_id', {
                mealplan
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async getMealPlan(family_uuid:string, week:string) {
        let { data, error } = await this.supabase
            .rpc('get_mealplan_id', {
                family_uuid,
                week
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async MealPlansFromFamily( family_uuid:string, user_uuid:string,  week:string ) {
        console.log({
            family_uuid,
            user_uuid,
            week
        })
        let { data, error } = await this.supabase
            .rpc('get_present_users_week', {
                family_uuid,
                user_uuid,
                week
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async getUsersFamilies(user_uuid:string) {
        let { data, error } = await this.supabase
            .rpc('get_all_users_family', {
                user_uuid
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async createMealPlan(family_uuid:string, first_day_of_week:string) {
        let { data, error } = await this.supabase
            .rpc('create_empty_mealplan', {
                family_uuid,
                first_day_of_week
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async addAttendance(day:string, family:string, user_id:string) {
        const { data, error } = await this.supabase
            .from('user_calendar')
            .insert([
                { date: day, family: family, user: user_id }
            ])
            .select()
    }
    async removeAttendance(day:string, family:string, user_id:string) {
        const { error } = await this.supabase
            .from('user_calendar')
            .delete()
            .eq('date', day)
            .eq('family', family)
            .eq('user', user_id)
    }

    async getAttendanceMonth(day:string, family:string, user_id:string) {
        let { data, error } = await this.supabase
            .rpc('get_dates_month', {
                day,
                family,
                user_id
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return Object.values(data);
        }
    }

    async getMealPlansFromFamily( family_uuid:string, user_uuid:string,  week:string ) {
        console.log({
            family_uuid,
            user_uuid,
            week
        })
        let { data, error } = await this.supabase
            .rpc('get_present_users_week', {
                family_uuid,
                user_uuid,
                week
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log("help:", data);
            return Object.values(data);
        }
    }

    async getFamilies(){
        try {
          const { data, error } = await this.supabase
            .rpc('get_all_users_family', {
              user_uuid: this._currentUser.getValue().id
            });
            if (error) {
              console.error(error);
              throw error;
            } else {     
              return Object.values(data); // Assuming data is an array of Recipe objects
            }
        } catch (error) {
          console.error('Error fetching recipes:', error);
          throw error;
        }
    }

    //Grocery List
    async getIngredients() {
        let ingredients: any[] = [];
        try {
            const { data: ingredientsData, error: ingredientsError } = await this.supabase
                .from('ingredient')
                .select("*");

            if (ingredientsError) {throw ingredientsError;}
            if(ingredientsData){
                return ingredientsData;}
        } catch (error) {
            console.error("Error fetching allergies:", error);
        }
        console.log(ingredients); 
        return [];
    }

    async getIngredientsForWeek(family: string, week: string) {
        try {
            const { data, error } = await this.supabase
                .rpc('get_shopping_list', {
                    family,
                    week
                });

            if (error) {
                console.error(error);
                throw error;
            } else {
                console.log(data); // You can handle the 'data' here as per your requirement
                return data; // Returning the data from the function if needed
            }
        } catch (error) {
            console.error('Error fetching shopping list:', error);
            throw error;
        }
    }
}

