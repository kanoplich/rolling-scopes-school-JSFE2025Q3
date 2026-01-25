export type Car = {
  name: string;
  color: string;
  id: number;
};

export type Cars = Array<Car>;

export type Engine = {
  velocity: number;
  distance: number;
};

export type Winner = {
  id: number;
  wins: number;
  time: number;
};

export type Winners = Array<Winner>;

export type driveMode = {
  success: boolean;
};
