const { create, get, list, edit } = require('../orders');
const orderData = require('../data/order1.json');
const productTestHelper = require('./test-utils/productTestHelper');

describe('Orders Module', () => {
  let createdProduct;
  let createdOrder;

  beforeAll(async () => {
    await productTestHelper.setupTestData();
    await productTestHelper.createTestOrders(5);
    createdOrder = await create(orderData); // Create an order for testing
  });

  afterAll(async () => {
    await productTestHelper.cleanupTestData();
  });

  describe('list', () => {
    it('should list orders', async () => {
      const orders = await list();
      expect(orders.length).toBeGreaterThan(4);
    });
  });

  it('should create an order', async () => {
    expect(createdOrder).toBeDefined();
    expect(createdOrder.buyerEmail).toBe(orderData.buyerEmail);
  });

  it('should get an order by ID', async () => {
    const order = await get(createdOrder._id);
    expect(order).toBeDefined();
    expect(order._id).toBe(createdOrder._id);
  });

  it('should edit an order', async () => {
    const change = { buyerEmail: 'updated_email@example.com' };
    const editedOrder = await edit(createdOrder._id, change);
    expect(editedOrder).toBeDefined();
    expect(editedOrder.buyerEmail).toBe(change.buyerEmail);
  });
});
