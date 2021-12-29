const baseURL = 'https://api.mercadolibre.com/sites/MLB/';
const itemsURL = 'https://api.mercadolibre.com/items';

export async function getCategories() {
    const response = await fetch(`${baseURL}/categories`);
    const result = await response.json();
    return result;
  }
  
  export async function getProductsFromCategoryAndQuery(categoryId, query) {
    const response = await fetch(`${baseURL}/search?category=${categoryId}&q=${query}`);
    const result = await response.json();
    return result;
  }

  export async function getProductById(id) {
    const response = await fetch(`${itemsURL}?ids=${id}`);
    const [product] = await response.json();
  
    return product;
  }