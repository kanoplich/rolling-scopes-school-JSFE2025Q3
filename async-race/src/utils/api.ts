import type { Car, Cars, driveMode, Engine, Winner, Winners } from '../types/type';

const URL = 'http://127.0.0.1:3000';

export const getCars = async (page: number, limit: number = 7) => {
  const response = await fetch(`${URL}/garage?_page=${page}&_limit=${limit}`);
  const cars: Cars = await response.json();
  const totalCountCars = response.headers.get('X-Total-Count') as string;

  return {
    cars,
    totalCountCars,
  };
};

export const getCar = async (id: number) => {
  const response = await fetch(`${URL}/garage/${id}`);
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

export const updateCar = async (id: number, name: string, color: string) => {
  const response = await fetch(`${URL}/garage/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, color }),
  });

  const car: Car = await response.json();
  return car;
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${URL}/garage/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};

export const startEngine = async (id: number) => {
  const response = await fetch(`${URL}/engine?id=${id}&status=started`, {
    method: 'PATCH',
  });

  const engine: Engine = await response.json();

  return engine;
};

export const stopEngine = async (id: number) => {
  const response = await fetch(`${URL}/engine?id=${id}&status=stopped`, {
    method: 'PATCH',
  });

  const engine: Engine = await response.json();

  return engine;
};

export const drive = async (id: number) => {
  const response = await fetch(`${URL}/engine/?id=${id}&status=drive`, {
    method: 'PATCH',
  });

  const result: driveMode = await response.json();

  return response.status == 200 ? result : { success: false };
};

export const getWinner = async (id: number) => {
  try {
    const response = await fetch(`${URL}/winners/${id}`);

    if (!response.ok) {
      return;
    }

    const winner: Winner = await response.json();
    return winner;
  } catch {
    return;
  }
};

export const getWinners = async (
  page: number,
  limit: number = 10,
  sort: string = 'id',
  order: string = 'ASC'
) => {
  const response = await fetch(
    `${URL}/winners/?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`
  );
  const winners: Winners = await response.json();
  const totalCountWinners = response.headers.get('X-Total-Count') as string;

  return {
    winners,
    totalCountWinners,
  };
};

export const createWinner = async (body: Winner) => {
  const response = await fetch(`${URL}/winners`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${URL}/winners/${id}`, {
    method: 'DELETE',
  });

  return await response.json();
};

export const updateWinner = async (id: number, body: Winner) => {
  const response = await fetch(`${URL}/winners/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return await response.json();
};
