import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  private pager: any = {};
  private pagedItems: any = [];
  private data: any = [];

  constructor() { }

  getPager() {
    return this.pager;
  }

  setData(obj) {
    this.data = obj;
    this.goToFirstPage();
  }

  getPagedItems() {
    return this.pagedItems;
  }

  setPager(totalItems: number, currentPage: number = 1, pageSize: number = 9) {
    let totalPages = Math.ceil(totalItems / pageSize);
    let startPage: number, endPage: number;

    if (currentPage < 1) {
      currentPage = 1;
    } else if (currentPage > totalPages) {
      currentPage = totalPages;
    }

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
    let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }

  goToPage(number) {
    this.pager = this.setPager(this.data.length, number);
    this.pagedItems = this.data.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  goToPreviousPage() {
    this.goToPage(this.pager.currentPage - 1);
  }

  goToNextPage() {
    this.goToPage(this.pager.currentPage + 1);
  }

  goToFirstPage() {
    this.goToPage(1);
  }

  goToLastPage() {
    this.goToPage(this.pager.totalPages);
  }
}
