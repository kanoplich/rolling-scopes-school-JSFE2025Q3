import type { Car } from '../types/type';
import { createCar, getCars } from '../utils/api';

class CarStore {
  private static instance: CarStore;
  private cars: Car[] = [];
  private totalCountCars: string = '0';
  private readonly page: number = 1;
  private listeners: Array<() => void> = [];

  static getInstance(): CarStore {
    if (!CarStore.instance) {
      CarStore.instance = new CarStore();
    }
    return CarStore.instance;
  }

  subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  async loadCars(page: number = this.page): Promise<void> {
    try {
      const response = await getCars(page);
      this.cars = response.cars;
      this.totalCountCars = response.totalCountCars;
      this.notify();
    } catch (error) {
      console.error(error);
    }
  }

  async createCar(name: string, color: string) {
    try {
      await createCar(name, color);
      await this.loadCars(this.page);
      this.notify();
    } catch (error) {
      console.error(error);
    }
  }

  getCars() {
    return [...this.cars];
  }

  getTotalCarsCount() {
    return this.totalCountCars;
  }

  getCurrentPage() {
    return this.page;
  }
}

export const carStore = CarStore.getInstance();
