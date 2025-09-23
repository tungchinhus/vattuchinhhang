import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProductCardComponent, Product } from '../../components/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, ProductCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class HomeComponent {
  featuredProducts: Product[] = [
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
    }
  ];

  features = [
    {
      icon: 'verified',
      title: 'Sản phẩm chính hãng',
      description: '100% sản phẩm chính hãng, có đầy đủ giấy tờ chứng nhận chất lượng'
    },
    {
      icon: 'local_shipping',
      title: 'Giao hàng nhanh',
      description: 'Giao hàng toàn quốc trong 24-48h, miễn phí ship cho đơn hàng từ 500k'
    },
    {
      icon: 'support_agent',
      title: 'Hỗ trợ 24/7',
      description: 'Đội ngũ tư vấn chuyên nghiệp, hỗ trợ khách hàng 24/7'
    },
    {
      icon: 'security',
      title: 'Bảo hành uy tín',
      description: 'Bảo hành chính hãng, đổi trả trong 30 ngày nếu không hài lòng'
    }
  ];

  categories = [
    {
      name: 'Lõi lọc nước',
      description: 'Các loại lõi lọc nước chính hãng: PP, CTO, RO, T33...',
      image: 'https://via.placeholder.com/400x200/4caf50/white?text=Lõi+Lọc'
    },
    {
      name: 'Máy lọc nước',
      description: 'Máy lọc nước RO, Nano, UF với công nghệ tiên tiến',
      image: 'https://via.placeholder.com/400x200/4caf50/white?text=Máy+Lọc'
    },
    {
      name: 'Thiết bị xử lý nước',
      description: 'Hệ thống xử lý nước công nghiệp, dân dụng',
      image: 'https://via.placeholder.com/400x200/4caf50/white?text=Thiết+Bị'
    }
  ];

  currentSlide = 0;

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.featuredProducts.length;
  }

  previousSlide() {
    this.currentSlide = this.currentSlide === 0 ? this.featuredProducts.length - 1 : this.currentSlide - 1;
  }
}