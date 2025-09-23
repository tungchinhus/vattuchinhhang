import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss']
})
export class HeaderComponent {
  cartCount: number = 0;
  activeDropdown: string | null = null;

  constructor() { }

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

  onDropdownToggle(dropdownId: string): void {
    if (this.activeDropdown === dropdownId) {
      this.activeDropdown = null;
    } else {
      this.activeDropdown = dropdownId;
    }
  }

  isDropdownActive(dropdownId: string): boolean {
    return this.activeDropdown === dropdownId;
  }
}