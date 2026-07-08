import type { Component } from 'vue';

export interface FareExtra {
  id: string;
  icon: Component;
  title: string;
  subtitle: string;
  price: number;
  items: string[];
}
