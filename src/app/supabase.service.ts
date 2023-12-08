import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
} from '@supabase/supabase-js'
import { environment} from "./environments/environment/environment";
import {error} from "@angular/compiler-cli/src/transformers/util";

export interface Profile {
    id?: string
    name: string
    first_name: string
}

@Injectable({
    providedIn: 'root',
})
export class SupabaseService {
    supabase: SupabaseClient
    _session: AuthSession | null = null

    constructor() {
        this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
    }

    get session() {
        this.supabase.auth.getSession().then(({ data }) => {
            this._session = data.session
        })
        return this._session
    }

    async getUserId(): Promise<string | undefined> {
        const { data } = await this.supabase.auth.getSession();
        this._session = data?.session;

        if (this._session?.user?.id) {
            return this._session.user.id;
        }
        return undefined;
    }


    profile(userId: string) {
        return this.supabase
            .from('users')
            .select(`name, first_name`)
            .eq('id', userId)
            .single()
    }

    authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
        return this.supabase.auth.onAuthStateChange(callback)
    }

    signIn(email: string) {
        return this.supabase.auth.signInWithOtp({ email })
    }

    signOut() {
        return this.supabase.auth.signOut()
    }

    updateProfile(profile: Profile) {
        const update = {
            ...profile,
            updated_at: new Date(),
        };

        const userId = this.getUserId(); // Retrieve the current user's ID

        if (userId) {
            return this.supabase
                .from('users') // Assuming 'profiles' is the table storing user profiles
                .update(update)
                .eq('id', userId);
        } else {
            throw new Error('User ID not available');
        }
    }


    getIngredients() {
        return this.supabase.from('ingredient').select('*').order('name');
    }

    getAllergies() {
        return this.supabase.from('allergie').select('*').order('allergie');
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

    async getUserPictureUrl(filename: string) {
        const { data } = this.supabase
            .storage
            .from('profile_pictures')
            .getPublicUrl(filename);

        return data.publicUrl;
    }

    async getImage(id: string) {
        const {data} = this.supabase
            .storage
            .from('recipes_thumbnail_and_picture')
            .getPublicUrl(id + '.png')

        return data.publicUrl;
    }

    async MealPlansFromFamily( family_uuid:String, user_uuid:String,  week:String ) {
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
    async GetUsersFamilies(user_uuid:String) {
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

    async GetLikedRecipes(date:String, family_uuid:String) {
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

    async GetNonLikedRecipes(date:String, family_uuid:String) {
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

    async CreateMealPlan(family_uuid:String, week:String) {
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

    async AddToMealPlan(day_of_week:String, mealplan:String, recipe:String) {
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
}