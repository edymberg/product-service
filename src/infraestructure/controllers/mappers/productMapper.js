const Product = require('../../../domain/src/product');

module.exports = {
  mapRequestToProduct(productDTO) {
    const productRequestDTO = { SKU: productDTO.SKU, name: productDTO.name };
    return new Product({ SKU: productRequestDTO.SKU, name: productRequestDTO.name });
  },
  mapProductToResponse(product) {
    const productResponseDTO = {
      productSKU: product.SKU,
    };
    return productResponseDTO;
  },
};
