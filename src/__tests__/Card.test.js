import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import Card from '../components/Card';
import store from '../store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

it('load and show charity info', () => {
  const item = {
    name: 'Soi Dog Phuket',
    image: 'paper-ranger.jpg',
    currency: 'THB',
  };

  const { getByText } = render(
    <Card defaultSelectedAmount={10} item={item} />,
    { wrapper: Wrapper }
  );

  expect(getByText('Soi Dog Phuket')).toBeInTheDocument();
  expect(screen.getByRole('button')).not.toBeDisabled();
});
