const fs = require('fs/promises');
const path = require('path');
const { create, destroy } = require('../products');

const productTestHelper = {
  testProductIds: [],

  async setupTestData() {
    console.log('Loading test products...');
    try {
      const dataPath = path.resolve(__dirname, '../data/full-products.json');
      const data = await fs.readFile(dataPath, 'utf-8');
      const testProducts = JSON.parse(data);

      // Add prices if missing and create products in parallel
      const createdProducts = await Promise.all(
        testProducts.map(async (product) => {
          if (!product.price) {
            product.price = Math.floor(Math.random() * 100) + 1;
          }
          return create(product);
        })
      );

      // Store created product IDs
      this.testProductIds = createdProducts.map((product) => product.id);
      console.log('Test products loaded successfully');
    } catch (error) {
      console.error('Error setting up test products:', error);
    }
  },

  async cleanupTestData() {
    console.log('Cleaning up test products...');
    try {
      // Delete products in parallel
      await Promise.all(
        this.testProductIds.map(async (productId) => {
          try {
            await destroy(productId);
          } catch (error) {
            console.error(`Error deleting product ID ${productId}:`, error);
          }
        })
      );

      // Clear the testProductIds array
      this.testProductIds = [];
      console.log('Test products cleaned up successfully');
    } catch (error) {
      console.error('Error cleaning up test products:', error);
    }
  },
};

module.exports = productTestHelper;
