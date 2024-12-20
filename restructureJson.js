const fs = require('fs');
const path = require('path');

// Define the function to get products from the JSON file
function getProducts() {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, 'products.json');

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject('Error reading the file: ' + err);
                return;
            }

            try {
                const products = JSON.parse(data);
                resolve(products);
            } catch (parseErr) {
                reject('Error parsing JSON: ' + parseErr);
            }
        });
    });
}

// Function to restructure the products JSON
function restructureProducts(rawProducts) {
    return rawProducts.map(product => ({
        id: product.id,
        title: product.title,
        description: product.description,
        category: product.category,
        price: product.price,
        discountPercentage: product.discountPercentage,
        rating: product.rating,
        stock: product.stock,
        tags: product.tags,
        sku: product.sku,
        brand: product.brand,
        weight: product.weight,
        dimensions: {
            width: product.dimensions?.width,
            height: product.dimensions?.height,
            depth: product.dimensions?.depth,
        },
        warrantyInformation: product.warrantyInformation,
        shippingInformation: product.shippingInformation,
        availabilityStatus: product.availabilityStatus,
        reviews: (product.reviews || []).map(review => ({
            rating: review.rating,
            comment: review.comment,
            date: review.date,
            reviewer: {
                username: review.reviewerName,
                email: review.reviewerEmail,
                avatar: "https://cdn.dummyjson.com/avatars/1.png",
                isVerified: false,
                location: "United States",
            },
        })),
        returnPolicy: product.returnPolicy,
        minimumOrderQuantity: product.minimumOrderQuantity,
        createdAt: product.meta.createdAt || new Date().toISOString(),
        updatedAt: product.meta.updatedAt || new Date().toISOString(),
        barcode: product.meta.barcode,
        qrCode: product.meta.qrCode,
        images: [
            ...product.images.map(imageUrl => ({
                url: imageUrl,
                alt: product.title,
            })),
            {
                url: product.thumbnail,
                alt: product.title,
                thumbnail: true,
            },
        ],
    }));
}

// Function to save updated JSON to a new file
function saveUpdatedProducts(fileName, data) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, fileName);

        fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', (err) => {
            if (err) {
                reject('Error writing to file: ' + err);
                return;
            }
            resolve('File successfully written to ' + filePath);
        });
    });
}

// Example usage
(async () => {
    try {
        const rawProducts = await getProducts();
        const structuredProducts = restructureProducts(rawProducts);
        const message = await saveUpdatedProducts('updatedProduct.json', structuredProducts);
        console.log(message);
    } catch (error) {
        console.error(error);
    }
})();
