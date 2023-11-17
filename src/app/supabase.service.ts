import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
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

    profile(user: User) {
        return this.supabase
            .from('users')
            .select(`name, first_name`)
            .eq('id', user.id)
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
        }

        return this.supabase.from('users').update(profile).eq('id',profile.id)
    }

    async MealPlansFromFamily( family_uuid:String,  day:String ) {
        let { data, error } = await this.supabase
            .rpc('get_present_users_week', {
                family_uuid,
                day
            })
        if (error) {
            console.error(error);
            return [];
        } else {
            console.log(data);
            return data as any[];
        }
    }
}