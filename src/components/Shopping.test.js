import { render, screen } from '@testing-library/react';
import ShoppingProduct from './ShoppingProduct';

test('renders learn react link', () => {
  render(<ShoppingProduct  title="My Product"/>);
  const ProductElement = screen.getByText(/my pruct/i);
  expect(ProductElement).toBeInTheDocument();
});
