import type { Car } from '../types/type';
import { createCar, deleteCar, getCars, updateCar } from '../utils/api';

class CarStore {
  private static instance: CarStore;
  private cars: Car[] = [];
  private totalCountCars: string = '0';
  private readonly pages = {
    currentPage: 1,
    totalPage: Math.ceil(+this.totalCountCars / 7),
  };
  private isSelected: boolean = false;
  private selectedCar: Car = {
    id: 0,
    color: '',
    name: '',
  };
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

  async loadCars(page: number = this.pages.currentPage): Promise<void> {
    try {
      const response = await getCars(page);
      this.cars = response.cars;
      this.totalCountCars = response.totalCountCars;
      this.pages.totalPage = Math.ceil(+this.totalCountCars / 7);
      this.notify();
    } catch (error) {
      console.error(error);
    }
  }

  async createCar(name: string, color: string) {
    try {
      await createCar(name, color);
    } catch (error) {
      console.error(error);
    }
  }

  async updateCar(id: number, name: string, color: string) {
    try {
      await updateCar(id, name, color);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCar(id: number) {
    try {
      await deleteCar(id);
    } catch (error) {
      console.log(error);
    }
  }

  getCar(id: number) {
    const car = this.cars.find((car) => car.id === id);
    return car;
  }

  getCars() {
    return [...this.cars];
  }

  getTotalCarsCount() {
    return this.totalCountCars;
  }

  getCurrentPage() {
    return this.pages.currentPage;
  }

  getTotalPages() {
    return this.pages.totalPage;
  }

  setCurrentPage(value: number) {
    this.pages.currentPage = value;
  }

  getSelectedCar() {
    return {
      car: this.selectedCar,
      isSelected: this.isSelected,
    };
  }

  setSelectedCar(car: Car, isSelected: boolean) {
    this.selectedCar = car;
    this.isSelected = isSelected;
  }
}

export const carStore = CarStore.getInstance();
