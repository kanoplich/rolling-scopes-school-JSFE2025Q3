import type { Winners } from '../types/type';
import { getWinner, getWinners } from '../utils/api';

class WinnersStore {
  private static instance: WinnersStore;
  private listeners: Array<() => void> = [];
  private winners: Winners = [];
  private totalCountWinners: string = '';
  private readonly pages = {
    currentPage: 1,
    totalPage: Math.ceil(+this.totalCountWinners / 10),
  };

  static getInstance(): WinnersStore {
    if (!WinnersStore.instance) {
      WinnersStore.instance = new WinnersStore();
    }
    return WinnersStore.instance;
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

  async loadWinners(
    page: number = this.pages.currentPage,
    limit: number = 10,
    sort: string = 'id',
    order: string = 'ASC'
  ): Promise<void> {
    try {
      const response = await getWinners(page, limit, sort, order);
      this.winners = response.winners;
      this.totalCountWinners = response.totalCountWinners;
      this.pages.totalPage = Math.ceil(+this.totalCountWinners / 10);
      this.notify();
    } catch (error) {
      console.error(error);
    }
  }

  async getWinner(id: number) {
    try {
      const winner = await getWinner(id);

      return winner;
    } catch (error) {
      console.log(error);
    }
  }

  getWinners() {
    return [...this.winners];
  }

  getTotalWinnersCount() {
    return this.totalCountWinners;
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
}

export const winnersStore = WinnersStore.getInstance();
