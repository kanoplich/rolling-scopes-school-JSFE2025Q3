import type { Car } from '../types/type';

const URL = 'http://127.0.0.1:3000';

export const getCars = async (page: number, limit: number = 7) => {
  const response = await fetch(`${URL}/garage?_page=${page}&_limit=${limit}`);
  const cars: Car[] = await response.json();
  const totalCountCars = response.headers.get('X-Total-Count') as string;

  return {
    cars,
    totalCountCars,
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${URL}/${id}`);
  const car: Car = await response.json();

  return car;
};

export const createCar = async (name: string, color: string) => {
  const response = await fetch(`${URL}/garage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });

  const car: Car = await response.json();
  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${URL}/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};
