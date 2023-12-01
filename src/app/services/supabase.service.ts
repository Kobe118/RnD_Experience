import { Injectable } from '@angular/core'
import {
    AuthChangeEvent,
    AuthSession,
    createClient,
    Session,
    SupabaseClient,
    User,
} from '@supabase/supabase-js'
import { environment} from "../environments/environment/environment";
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


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
    private _currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null); // this is a BehaviorSubject from rxjs that is used to store the current user and is initialized with null as the default value

    constructor() {
      this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
      console.log("REFRESHTOKEN:", this.getRefreshToken());
      console.log("USER:", this.getLocalUser());
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

    async signUp(credentials: { email: string; password: string }) {
        return new Promise(async (resolve, reject) => {
          const { error, data } = await this.supabase.auth.signUp(credentials);
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
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

    signIn(credentials: { email: string; password: string }) {
        return new Promise(async (resolve, reject) => {
          const { error, data } = await this.supabase.auth.signInWithPassword(
            credentials
          );
          this._currentUser.next(data?.user); // pass the user to the currentUser BehaviorSubject
          console.log("USER:", this.currentUser);
    
          if (error) {
            reject(error);
          } else {
            const refreshToken = data.session.refresh_token;
            const account = data.user;
            this.setRefreshToken(refreshToken);
            this.setLocalUser(account)
            console.log("REFRESHTOKEN:", this.getRefreshToken());
            console.log("USERSESSION:", data.session);
            console.log("USERDATA:", data.user);
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
  
    private getRefreshToken(): string | null {
      return localStorage.getItem('token');
    }
    
    private getLocalUser(): User | null {
      const userString = localStorage.getItem('user');
      if (userString) {
        return JSON.parse(userString);
      }
      return null;
    }
  
    private clearTokens(): void {
      localStorage.removeItem('token');
    }

    signOut() {
    // Remove the stored session from LocalStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      this._currentUser.next(null);
      return this.supabase.auth.signOut();
    }

    updateProfile(profile: Profile) {
        const update = {
            ...profile,
            updated_at: new Date(),
        }

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

    async getImageUrl(id: string) {
      const { data } = this.supabase
          .storage
          .from('recipes_thumbnail_and_picture')
          .getPublicUrl(id+'.png')

      return data.publicUrl;
    }
}