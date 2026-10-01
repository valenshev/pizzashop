export function preventNegativeValues(value) {
    if (value < 0) {
      value = 0;
    }
    return value;
  }

export function getCartFromLocalStorage() {
  return localStorage.getItem('cart')
}

export function selectedSize() {
  const selectedSize = button.dataset.type;
  cardContainer.setAttribute('data-selected-size', selectedSize);
  productCard.dataset.selectedSize = selectedSize;
}