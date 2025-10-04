import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { GOOGLE_CONFIG } from '../../config/google.config';
import { AuthService, User } from '../../services/auth.service';
import { RecaptchaService } from '../../services/recaptcha.service';

// Declare Google Identity Services
declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
  imports: [CommonModule, ReactiveFormsModule, MatIconModule]
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;
  private googleClientId = GOOGLE_CONFIG.CLIENT_ID;
  private loadingTimeout: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private recaptchaService: RecaptchaService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit(): void {
    // Initialize component
  }

  ngAfterViewInit(): void {
    this.loadGoogleScript()
      .then(() => this.initializeGoogleSignIn())
      .catch((err) => console.error('Failed to load Google script', err));

    // Prepare reCAPTCHA Enterprise
    this.prepareRecaptcha();
  }

  /**
   * Lazy load Google Identity Services script (only on login page)
   */
  private loadGoogleScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).google) {
        resolve();
        return;
      }

      const existing = document.getElementById('google-identity-script') as HTMLScriptElement | null;
      if (existing) {
        existing.addEventListener('load', () => resolve());
        existing.addEventListener('error', (e) => reject(e));
        return;
      }

      const script = document.createElement('script');
      script.id = 'google-identity-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        console.log('Google script loaded successfully');
        resolve();
      };
      script.onerror = (e) => {
        console.error('Failed to load Google script:', e);
        reject(e);
      };
      document.head.appendChild(script);
    });
  }

  /**
   * Initialize Google Sign-In
   */
  private initializeGoogleSignIn(): void {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: this.googleClientId,
        callback: this.handleGoogleSignIn.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true
      });
      
      console.log('Google Identity Services initialized');
    } else {
      console.error('Google Identity Services not loaded');
    }
  }

  /**
   * Prepare reCAPTCHA Enterprise execution on submit
   */
  private prepareRecaptcha(): void {
    const siteKey = '6LfY_9wrAAAAANBa4NThxT0RjkERLkyRLs9iOC8R';
    const form = document.querySelector('form.login-form-content');
    if (!form) {
      return;
    }
    form.addEventListener('submit', (e) => {
      // If form invalid, let Angular handle
      if (this.loginForm.invalid) {
        return;
      }
      e.preventDefault();
      // Execute reCAPTCHA Enterprise then continue login
      // @ts-ignore
      grecaptcha.enterprise.ready(() => {
        // @ts-ignore
        grecaptcha.enterprise.execute(siteKey, { action: 'login' }).then((token: string) => {
          // Verify token on backend first
          this.recaptchaService.verifyToken(token, 'login').subscribe((ok) => {
            if (ok) {
              this.onLogin();
            } else {
              alert('Xác thực reCAPTCHA thất bại. Vui lòng thử lại.');
            }
          });
        }).catch((err: any) => {
          console.error('reCAPTCHA execute error', err);
          this.onLogin();
        });
      });
    }, { once: true });
  }

  /**
   * Handle Google Sign-In response
   */
  private handleGoogleSignIn(response: any): void {
    try {
      // Decode the JWT token
      const payload = this.decodeJwtToken(response.credential);
      
      console.log('Google Sign-In successful:', payload);
      
      // Store user data
      const userData: User = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        provider: 'google'
      };

      // Login user through AuthService
      this.authService.login(userData);
      
      // Show success message
      alert(`Đăng nhập thành công! Chào mừng ${userData.name}`);
      
      // Redirect to home page
      this.router.navigate(['/home']);
      
    } catch (error) {
      console.error('Google Sign-In error:', error);
      alert('Có lỗi xảy ra khi đăng nhập với Google. Vui lòng thử lại.');
    }
  }

  /**
   * Decode JWT token
   */
  private decodeJwtToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
  }

  /**
   * Toggle password visibility
   */
  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  /**
   * Handle login form submission
   */
  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      
      // Clear any existing timeout
      if (this.loadingTimeout) {
        clearTimeout(this.loadingTimeout);
      }
      
      // Simulate API call with timeout cleanup
      this.loadingTimeout = setTimeout(() => {
        this.isLoading = false;
        this.loadingTimeout = null;
        
        // For demo purposes, always redirect to home
        // In real app, check credentials and handle errors
        console.log('Login attempt:', this.loginForm.value);
        this.router.navigate(['/home']);
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      this.loginForm.markAllAsTouched();
    }
  }

  /**
   * Handle forgot password click
   */
  onForgotPassword(event: Event): void {
    event.preventDefault();
    // Implement forgot password logic
    console.log('Forgot password clicked');
    // You can navigate to forgot password page or show modal
    alert('Tính năng quên mật khẩu sẽ được triển khai sớm!');
  }

  /**
   * Handle social login
   */
  onSocialLogin(provider: 'facebook' | 'google'): void {
    if (provider === 'google') {
      this.handleGoogleLogin();
    } else if (provider === 'facebook') {
      this.handleFacebookLogin();
    }
  }

  /**
   * Handle Google login
   */
  private handleGoogleLogin(): void {
    console.log('Google login clicked');
    console.log('Google script available:', typeof window !== 'undefined' && !!window.google);
    console.log('Client ID:', this.googleClientId);
    
    if (typeof window !== 'undefined' && window.google) {
      try {
        // Use Google Identity Services popup
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: this.googleClientId,
          scope: 'openid email profile',
          callback: (response: any) => {
            console.log('Google OAuth response:', response);
            if (response.access_token) {
              this.handleGoogleTokenResponse(response);
            } else {
              console.error('No access token received');
              alert('Không thể lấy thông tin từ Google. Vui lòng thử lại.');
            }
          },
          error_callback: (error: any) => {
            console.error('Google OAuth error:', error);
            alert('Có lỗi xảy ra khi đăng nhập với Google. Vui lòng thử lại.');
          }
        });
        
        console.log('Token client created, requesting access token...');
        tokenClient.requestAccessToken();
      } catch (error) {
        console.error('Error initializing Google OAuth:', error);
        alert('Google Sign-In không khả dụng. Vui lòng thử lại sau.');
      }
    } else {
      console.error('Google script not loaded');
      alert('Google Sign-In không khả dụng. Vui lòng thử lại sau.');
    }
  }

  /**
   * Handle Google token response
   */
  private handleGoogleTokenResponse(response: any): void {
    // Use the access token to get user info
    fetch(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${response.access_token}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(userInfo => {
        const userData: User = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
          provider: 'google'
        };

        // Login user through AuthService
        this.authService.login(userData);
        
        // Show success message
        alert(`Đăng nhập thành công! Chào mừng ${userData.name}`);
        
        // Redirect to home page
        this.router.navigate(['/home']);
      })
      .catch(error => {
        console.error('Error fetching user info:', error);
        alert('Có lỗi xảy ra khi lấy thông tin người dùng. Vui lòng thử lại.');
      });
  }

  /**
   * Handle Facebook login
   */
  private handleFacebookLogin(): void {
    console.log('Facebook login clicked');
    // Implement Facebook login logic
    alert('Đăng nhập với Facebook sẽ được triển khai sớm!');
  }

  /**
   * Handle register click
   */
  onRegister(event: Event): void {
    event.preventDefault();
    // Navigate to register page
    console.log('Register clicked');
    alert('Trang đăng ký sẽ được triển khai sớm!');
  }

  /**
   * Get form control for template access
   */
  getFormControl(controlName: string) {
    return this.loginForm.get(controlName);
  }

  /**
   * Check if form field has error
   */
  hasError(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  /**
   * Get error message for field
   */
  getErrorMessage(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} là bắt buộc`;
      }
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} phải có ít nhất ${requiredLength} ký tự`;
      }
    }
    return '';
  }

  /**
   * Get field label for error messages
   */
  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      'username': 'Tên đăng nhập',
      'password': 'Mật khẩu'
    };
    return labels[fieldName] || fieldName;
  }

  /**
   * Cleanup on component destroy
   */
  ngOnDestroy(): void {
    // Clear any pending timeouts
    if (this.loadingTimeout) {
      clearTimeout(this.loadingTimeout);
      this.loadingTimeout = null;
    }
    
    // Reset loading state
    this.isLoading = false;
  }
}
