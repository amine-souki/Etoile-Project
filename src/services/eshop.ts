/**
 * Represents a product from the Etoile boutique.
 */
export interface Product {
  /**
   * The name of the product.
   */
  name: string;
  /**
   * The description of the product.
   */
  description: string;
  /**
   * The price of the product.
   */
  price: number;
  /**
   * URL of the product image.
   */
  imageUrl: string;
  /**
   * URL to buy product.
   */
  buyUrl: string;
}

/**
 * Asynchronously retrieves the product catalog from the Etoile boutique.
 *
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  // TODO: Implement this by calling an API.

  return [
    {
      name: 'Official Jersey',
      description: 'The official team jersey for the current season.',
      price: 75.00,
      imageUrl: 'https://example.com/images/jersey.jpg',
      buyUrl: 'https://example.com/products/jersey',
    },
    {
      name: 'Etoile Scarf',
      description: 'Show your support with the official Etoile scarf.',
      price: 25.00,
      imageUrl: 'https://example.com/images/scarf.jpg',
      buyUrl: 'https://example.com/products/scarf',
    },
  ];
}
