import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { ProductCardComponent, Product } from '../../components/product-card/product-card';
import { ProductService, ProductDocument } from '../../services/product.service';

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

  products: Product[] = [];

  constructor(private readonly productService: ProductService, private readonly route: ActivatedRoute, private readonly router: Router) {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.selectedCategory = slug;
      this.loadCategory(slug);
    } else {
      this.loadProducts();
    }
  }

  private async loadProducts() {
    const docs = await this.productService.getAll();
    this.products = docs.map((d) => ({
      id: (d as any).id ? Number.NaN : 0,
      name: `${d.brand} ${d.model}`.trim(),
      description: (d as any).shortDescription || d.description || '',
      price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.price),
      oldPrice: typeof d.oldPrice === 'number' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.oldPrice) : undefined,
      image: d.images?.[0] || '',
      rating: d.rating,
      reviews: d.reviews,
      isNew: (d as any).isNew,
      isSale: !!(typeof d.oldPrice === 'number' && d.oldPrice > d.price),
      features: d.highlights
    }));
  }

  private async loadCategory(slug: string) {
    const docs = await this.productService.getByCategorySlug(slug);
    this.products = docs.map((d) => ({
      id: (d as any).id ? Number.NaN : 0,
      name: `${d.brand} ${d.model}`.trim(),
      description: (d as any).shortDescription || d.description || '',
      price: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.price),
      oldPrice: typeof d.oldPrice === 'number' ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(d.oldPrice) : undefined,
      image: d.images?.[0] || '',
      rating: d.rating,
      reviews: d.reviews,
      isNew: (d as any).isNew,
      isSale: !!(typeof d.oldPrice === 'number' && d.oldPrice > d.price),
      features: d.highlights
    }));
  }

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
    if (categoryId === 'all') {
      this.router.navigate(['/products']);
      this.loadProducts();
    } else {
      this.router.navigate(['/category', categoryId]);
      this.loadCategory(categoryId);
    }
  }

  getSelectedCategoryName(): string {
    const category = this.categories.find(c => c.id === this.selectedCategory);
    return category ? category.name : 'Tất cả sản phẩm';
  }
}