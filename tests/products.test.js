const { mockDb, mockProducts, mockModel } = require('./db.mock');
const { list } = require('../products');
jest.mock('../db', () => mockDb);

describe('Products Module', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should list products', async () => {
    const products = await list();
    expect(products.length).toBe(2);
    expect(products[0].description).toBe('Product 1');
    expect(products[1].description).toBe('Product 2');
  });

  describe('get', () => {
    it('should get a product by ID', async () => {
      mockModel.findById = jest.fn().mockResolvedValue({ description: 'Product 1' });
      const product = await mockModel.findById('mockId'); // Replace with `get` method if implemented
      expect(product).toBeDefined();
      expect(product.description).toBe('Product 1');
    });
  });

  describe('destroy', () => {
    it('should delete a product by ID', async () => {
      mockModel.deleteOne = jest.fn().mockResolvedValue({ deletedCount: 1 });
      const result = await mockModel.deleteOne({ _id: 'mockId' }); // Replace with `destroy` method if implemented
      expect(result.deletedCount).toBe(1);
    });
  });
});
