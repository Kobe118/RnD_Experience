import { Injectable } from '@angular/core';
import { RealtimeChannel, User } from '@supabase/supabase-js';
import { BehaviorSubject, first, Observable, skipWhile } from 'rxjs';
import { SupabaseService } from './supabase.service';

export interface Profile {
  user_id: string;
  photo_url: string;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // Supabase user state
  private _$user = new BehaviorSubject<User | null | undefined>(undefined);
  $user = this._$user.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<User | null>;
  private user_id?: string;

  // Profile state
  private _$profile = new BehaviorSubject<Profile | null | undefined>(undefined);
  $profile = this._$profile.pipe(skipWhile(_ => typeof _ === 'undefined')) as Observable<Profile | null>;
  private profile_subscription?: RealtimeChannel;

  constructor(private supabase: SupabaseService) { }
  
}

