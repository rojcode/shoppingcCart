class Pagination {
    constructor(items, itemsPerPage) {
      this.items = items;
      this.itemsPerPage = itemsPerPage;
      this.currentPage = 1;
    }
  
    getTotalPages() {
      return Math.ceil(this.items.length / this.itemsPerPage);
    }
  
    getCurrentPage() {
      return this.currentPage;
    }
  
    goToPage(pageNumber) {
        if (pageNumber > 0 && pageNumber <= this.getTotalPages()) {
          this.currentPage = pageNumber;
          return true; 
        } else {
          return false; 
      }
    }
  
    nextPage() {
      if (this.currentPage < this.getTotalPages()) {
        this.currentPage++;
      }
    }
  
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    }
  
    getPageItems() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.items.slice(startIndex, endIndex);
    }
}
  
// export default Pagination;