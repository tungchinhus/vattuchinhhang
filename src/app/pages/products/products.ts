import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCardComponent, Product } from '../../components/product-card/product-card';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule, ProductCardComponent],
  templateUrl: './products.html',
  styleUrls: ['./products.scss']
})
export class ProductsComponent {
  selectedCategory = 'all';
  
  categories = [
    { id: 'all', name: 'Tất cả sản phẩm' },
    { id: 'loi-loc', name: 'Lõi lọc nước' },
    { id: 'may-loc', name: 'Máy lọc nước' },
    { id: 'thiet-bi', name: 'Thiết bị xử lý nước' }
  ];

  products: Product[] = [
    {
      id: 1,
      name: 'Lõi lọc PP 10 inch',
      description: 'Lõi lọc thô PP 10 inch, loại bỏ bùn đất, cặn bẩn',
      price: '150.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=PP+10"',
      rating: 4.5,
      reviews: 25,
      isNew: true
    },
    {
      id: 2,
      name: 'Lõi lọc CTO 10 inch',
      description: 'Lõi lọc than hoạt tính CTO 10 inch, khử mùi vị',
      price: '200.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=CTO+10"',
      rating: 4.8,
      reviews: 18,
      isSale: true,
      oldPrice: '250.000đ'
    },
    {
      id: 3,
      name: 'Lõi lọc RO 75GPD',
      description: 'Màng lọc RO 75GPD, loại bỏ 99.9% tạp chất',
      price: '800.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=RO+75"',
      rating: 4.9,
      reviews: 32
    },
    {
      id: 4,
      name: 'Lõi lọc T33 10 inch',
      description: 'Lõi lọc than hoạt tính T33 10 inch, cải thiện vị nước',
      price: '180.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=T33+10"',
      rating: 4.6,
      reviews: 22
    },
    {
      id: 5,
      name: 'Máy lọc nước RO 8 cấp',
      description: 'Máy lọc nước RO 8 cấp lọc, công suất 10L/h',
      price: '2.500.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=RO+8C"',
      rating: 4.7,
      reviews: 15,
      isNew: true
    },
    {
      id: 6,
      name: 'Máy lọc nước Nano 5 cấp',
      description: 'Máy lọc nước Nano 5 cấp, không cần điện',
      price: '1.800.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=Nano+5C"',
      rating: 4.4,
      reviews: 28
    }
  ];

  get filteredProducts(): Product[] {
    if (this.selectedCategory === 'all') {
      return this.products;
    }
    return this.products.filter(product => {
      // Simple filtering based on product name for demo
      switch (this.selectedCategory) {
        case 'loi-loc':
          return product.name.toLowerCase().includes('lõi lọc');
        case 'may-loc':
          return product.name.toLowerCase().includes('máy lọc');
        case 'thiet-bi':
          return product.name.toLowerCase().includes('thiết bị');
        default:
          return true;
      }
    });
  }

  selectCategory(categoryId: string) {
    this.selectedCategory = categoryId;
  }

  getSelectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategory);
    return category ? category.name : 'Tất cả sản phẩm';
  }
}