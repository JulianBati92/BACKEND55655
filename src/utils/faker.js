import { faker } from '@faker-js/faker';

export const generateProduct = () => {
    return {
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price(),
        stock: faker.random.numeric(3),
        photo: faker.image.imageUrl(),
    };
};
