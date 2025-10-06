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
      name: 'Máy nóng lạnh Karofi HCV206',
      description: 'Máy nước nóng lạnh công nghiệp với công nghệ tiên tiến',
      price: '5.490.000đ',
      image: 'https://via.placeholder.com/200x200/4caf50/white?text=Karofi+HCV206',
      rating: 4.8,
      reviews: 25,
      isNew: true,
      features: [
        '3 vòi với 3 chế độ: Nóng – Lạnh – Nguội',
        'Hệ thống 01 lõi lọc công nghệ SMAX : Gấp 2',
        'Công nghệ làm nóng nhanh: 85-95°C',
        'Công nghệ làm lạnh Chíp: 12-15°C'
      ]
    },
    {
      id: 2,
      name: 'Cây nước nóng lạnh hút bình Karofi HC19',
      description: 'Máy nước nóng lạnh hút bình tự động siêu bền',
      price: '7.050.000đ',
      image: 'https://via.placeholder.com/200x200/d32f2f/white?text=Karofi+HC19',
      rating: 4.9,
      reviews: 18,
      isSale: true,
      oldPrice: '8.200.000đ',
      features: [
        'Công nghệ hút bình tự động thông minh',
        'Hệ thống lọc nước RO 8 cấp',
        'Nước nóng 85-95°C, lạnh 8-12°C',
        'Đèn báo mức nước và nhiệt độ'
      ]
    },
    {
      id: 3,
      name: 'Cây nước nóng lạnh Karofi HC18',
      description: 'Máy nước nóng lạnh cao cấp với bình áp 20L',
      price: '7.260.000đ',
      image: 'https://via.placeholder.com/200x200/2e7d32/white?text=Karofi+HC18',
      rating: 4.7,
      reviews: 32,
      features: [
        'Bình áp 20L độ bền cao',
        'Van chia 3 đường nước độc lập',
        'Công nghệ làm lạnh không đá ',
        'Hệ thống an toàn chống quá nhiệt'
      ]
    },
    {
      id: 4,
      name: 'Máy lọc RO 9 cấp Karofi Optimus Plus',
      description: 'Máy lọc nước RO cao cấp với 9 cấp lọc',
      price: '4.790.000đ',
      image: 'https://via.placeholder.com/200x200/616161/white?text=RO+9+cap',
      rating: 4.9,
      reviews: 22,
      isNew: true,
      features: [
        'Hệ thống lọc RO 9 cấp siêu sạch',
        'Đèn LED hiển thị chế độ hoạt động',
        'Báo đỏi lõi lọc tự động',
        'Van chia áp cao tiết kiệm điện'
      ]
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