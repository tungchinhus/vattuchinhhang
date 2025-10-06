import { InjectionToken, Provider } from '@angular/core';
import { initializeApp, FirebaseApp } from 'firebase/app';
import { getFirestore, Firestore } from 'firebase/firestore';

export interface FirebaseEnvironmentConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  measurementId?: string;
}

export const FIREBASE_CONFIG = new InjectionToken<FirebaseEnvironmentConfig>('FIREBASE_CONFIG');
export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');
export const FIRESTORE = new InjectionToken<Firestore>('FIRESTORE');

export function provideFirebase(config: FirebaseEnvironmentConfig): Provider[] {
  const app = initializeApp(config);
  const db = getFirestore(app);
  return [
    { provide: FIREBASE_CONFIG, useValue: config },
    { provide: FIREBASE_APP, useValue: app },
    { provide: FIRESTORE, useValue: db }
  ];
}


