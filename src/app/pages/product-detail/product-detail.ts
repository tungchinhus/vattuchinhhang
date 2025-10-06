import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductService, ProductDocument } from '../../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './product-detail.html',
  styleUrls: ['./product-detail.scss']
})
export class ProductDetailComponent implements OnInit {
  product = signal<ProductDocument | undefined>(undefined);

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productService: ProductService
  ) {}

  async ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') || '';
    if (!slug) return;
    const doc = await this.productService.getBySlug(slug);
    this.product.set(doc);
  }
}


