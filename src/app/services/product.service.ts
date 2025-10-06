import { Injectable, inject } from '@angular/core';
import { Firestore, collection, getDocs, doc, getDoc, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { FIRESTORE } from './firebase';
import { Product } from '../components/product-card/product-card';

export interface ProductDocument extends Omit<Product, 'id' | 'price' | 'oldPrice' | 'rating' | 'reviews'> {
  id?: string;
  slug: string;
  brand: string;
  model: string;
  sku?: string;
  price: number;
  oldPrice?: number;
  rating?: number;
  reviews?: number;
  shortDescription?: string;
  categories: string[];
  specifications?: Record<string, string | number | boolean>;
  highlights?: string[];
  images: string[];
  status?: 'active' | 'inactive';
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly db: Firestore = inject(FIRESTORE);

  async getAll(): Promise<ProductDocument[]> {
    const colRef = collection(this.db, 'products');
    const snapshot = await getDocs(colRef);
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  }

  async getBySlug(slug: string): Promise<ProductDocument | undefined> {
    const colRef = collection(this.db, 'products');
    const q = query(colRef, where('slug', '==', slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return undefined;
    return { id: snapshot.docs[0].id, ...(snapshot.docs[0].data() as any) };
  }

  async getByCategorySlug(categorySlug: string): Promise<ProductDocument[]> {
    const colRef = collection(this.db, 'products');
    const q = query(colRef, where('categories', 'array-contains', categorySlug));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((d) => ({ id: d.id, ...(d.data() as any) }));
  }

  async getById(id: string): Promise<ProductDocument | undefined> {
    const ref = doc(this.db, 'products', id);
    const snap = await getDoc(ref);
    if (!snap.exists()) return undefined;
    return { id: snap.id, ...(snap.data() as any) };
  }

  async create(data: Omit<ProductDocument, 'images'> & { images?: string[] }): Promise<string> {
    const colRef = collection(this.db, 'products');
    const docRef = await addDoc(colRef, { ...data, images: data.images || [] });
    return docRef.id;
  }

  async update(id: string, data: Partial<ProductDocument>): Promise<void> {
    const ref = doc(this.db, 'products', id);
    await updateDoc(ref, data as any);
  }

  async remove(id: string): Promise<void> {
    const ref = doc(this.db, 'products', id);
    await deleteDoc(ref);
  }
}


