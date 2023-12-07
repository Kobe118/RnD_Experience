import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss'],
})
export class LogInComponent implements OnInit {
  credentials!: FormGroup;

  constructor(
    private supabaseService: SupabaseService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async supabaseLogin() {
    try {
      await this.supabaseService.signIn(this.credentials.value);
      this.showError('Login Successful', 'Welcome back!');
      this.router.navigateByUrl('/Home', { replaceUrl: true });
    } catch (err: any) {
      this.showError('Login Failed', err.message);
    }
  }

  showError(title: string, msg: string) {
    // Implement your error display logic here
    console.error(title, msg);
  }

  // Method to navigate to the sign-up page
  redirectToSignUpPage() {
    this.router.navigateByUrl('/register', {replaceUrl: true});
  }
}
