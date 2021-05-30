var faker = require('faker');

var database = {
    customers:[],
    orders:[],
    products:[],
    categories:[]
}


for (var i = 1; i<= 400; i++) {
  database.customers.push({
    membership: "",
    mobile: faker.phone.phoneNumber(),
    rewards: faker.helpers.mustache(),
    id: i,
    first_name: faker.name.firstName,
    last_name: faker.name.lastName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
  });
  database.orders.push({
      id: i,
      reference:faker.commerce.productMaterial(),
      customer_id: faker.datatype.number(),
      products: {
          productId: i,
          product_name: faker.commerce.productName(),
          category_id: faker.datatype.number(),
          unit_instock: faker.datatype.number(),
          unit_price: faker.commerce.price()
      }
  });
  database.products.push({
      id: i,
      product_name: faker.commerce.productName(),
      category_id: faker.datatype.number(),
      unit_instock: faker.datatype.number(),
      unit_price: faker.commerce.price()
  });
  database.categories.push({
      id: i,
      category_name: faker.commerce.department(),
      description: faker.commerce.productDescription(),
      picture: faker.image.avatar()
  })

}

console.log(JSON.stringify(database));
