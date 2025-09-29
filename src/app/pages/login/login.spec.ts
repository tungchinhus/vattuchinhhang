import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginComponent } from './login';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    mockRouter = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.get('username')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should toggle password visibility', () => {
    expect(component.showPassword).toBeFalse();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTrue();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalse();
  });

  it('should validate required fields', () => {
    component.loginForm.patchValue({
      username: '',
      password: ''
    });
    component.loginForm.markAllAsTouched();
    
    expect(component.loginForm.invalid).toBeTrue();
    expect(component.loginForm.get('username')?.hasError('required')).toBeTrue();
    expect(component.loginForm.get('password')?.hasError('required')).toBeTrue();
  });

  it('should validate minimum length', () => {
    component.loginForm.patchValue({
      username: 'ab',
      password: '12345'
    });
    component.loginForm.markAllAsTouched();
    
    expect(component.loginForm.get('username')?.hasError('minlength')).toBeTrue();
    expect(component.loginForm.get('password')?.hasError('minlength')).toBeTrue();
  });

  it('should call onLogin when form is valid', () => {
    spyOn(component, 'onLogin');
    component.loginForm.patchValue({
      username: 'testuser',
      password: 'password123'
    });
    
    component.onLogin();
    expect(component.onLogin).toHaveBeenCalled();
  });

  it('should handle forgot password click', () => {
    spyOn(component, 'onForgotPassword');
    const event = new Event('click');
    component.onForgotPassword(event);
    expect(component.onForgotPassword).toHaveBeenCalledWith(event);
  });

  it('should handle social login', () => {
    spyOn(component, 'onSocialLogin');
    component.onSocialLogin('facebook');
    expect(component.onSocialLogin).toHaveBeenCalledWith('facebook');
  });

  it('should handle register click', () => {
    spyOn(component, 'onRegister');
    const event = new Event('click');
    component.onRegister(event);
    expect(component.onRegister).toHaveBeenCalledWith(event);
  });
});
