import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';

import Card from '../components/Card';
import store from '../store';

const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

it('load and show charity info', () => {
  const item = {
    name: 'Paper Ranger',
    image: 'paper-ranger.jpg',
    currency: 'THB',
  };

  const { getByText } = render(
    <Card defaultSelectedAmount={10} item={item} />,
    { wrapper: Wrapper }
  );

  expect(getByText('Paper Ranger')).toBeInTheDocument();
  expect(screen.getByRole('button')).not.toBeDisabled();
});

it('load and show payment', async () => {
  const item = {
    name: 'Paper Ranger',
    image: 'paper-ranger.jpg',
    currency: 'THB',
  };

  const { getByText } = render(
    <Card defaultSelectedAmount={10} item={item} />,
    { wrapper: Wrapper }
  );
  await userEvent.click(screen.getByRole('button'));

  expect(getByText('Select the amount to donate (THB)')).toBeInTheDocument();
});
