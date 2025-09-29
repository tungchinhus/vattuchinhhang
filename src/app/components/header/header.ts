import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AuthService, User } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  isLoggedIn: boolean = false;
  currentUser: User | null = null;
  private userSubscription: Subscription = new Subscription();

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Subscribe to user changes
    this.userSubscription = this.authService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    this.userSubscription.unsubscribe();
  }

  /**
   * Get user display name
   */
  getUserDisplayName(): string {
    return this.currentUser?.name || 'Guest';
  }

  /**
   * Get user email
   */
  getUserEmail(): string {
    return this.currentUser?.email || '';
  }

  /**
   * Get user profile picture
   */
  getUserProfilePicture(): string {
    return this.currentUser?.picture || '';
  }

  onSearch(searchTerm: string | Event): void {
    let searchValue: string;
    
    if (typeof searchTerm === 'string') {
      searchValue = searchTerm;
    } else {
      const target = searchTerm.target as HTMLInputElement;
      searchValue = target.value;
    }
    
    if (searchValue.trim()) {
      console.log('Searching for:', searchValue);
      // Implement search functionality here
      // You can emit an event or navigate to search results
    }
  }

  onCartClick(): void {
    console.log('Cart clicked');
    // Implement cart functionality here
    // You can navigate to cart page or open cart modal
  }


  onProfileClick(): void {
    console.log('Profile clicked');
    // You can add profile functionality here
  }

  /**
   * Handle logout
   */
  onLogout(): void {
    this.authService.logout();
    console.log('User logged out');
  }
}