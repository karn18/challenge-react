import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  border-width: 1px;
  border-style: solid;
  border-radius: 0.5rem;
  width: 48%;

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
`;

const Body = styled.div`
  align-items: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  height: 100%;
  min-height: 330px;
`;

const Footer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 0.2.5rem;
  padding-bottom: 0.2.5rem;
`;

const Button = styled.button`
  background-color: #fff;
  border: 1px solid #1d4ed8;
  border-radius: 0.5rem;
  color: #1d4ed8;
  cursor: pointer;
  padding-left: 0.75rem;
  padding-right: 0.75rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  &:hover {
    background-color: #60a5fa;
    color: #fff;
  }
`;

const Amount = styled.div`
  display: flex;
  gap: 1rem;
`;

const Close = styled.div`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;

export default connect((state) => state)(function Card(props) {
  const { item } = props;
  const DONATION_AMOUNTS = [10, 20, 50, 100, 500];
  const [flip, setFlip] = useState(true);
  const [selectedAmount, setSelectedAmount] = useState(
    props.defaultSelectedAmount
  );

  const payments = DONATION_AMOUNTS.map((amount, j) => (
    <label key={j}>
      <input
        type="radio"
        name="payment"
        onClick={function () {
          setSelectedAmount(amount);
        }}
        defaultChecked={selectedAmount === amount}
      />
      {amount}
    </label>
  ));

  async function handlePay(id, amount, currency = 'THB') {
    const response = await fetch('http://localhost:3001/payments', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        charitiesId: id,
        amount,
        currency,
      }),
    });
    if (response.status === 201) {
      props.dispatch({
        type: 'UPDATE_TOTAL_DONATE',
        amount,
      });
      props.dispatch({
        type: 'UPDATE_MESSAGE',
        message: `Thank you for donating ${amount} ${currency} to ${item.name}.`,
      });
    }
  }
  return (
    <Container>
      {flip ? (
        <>
          <div>
            <Image
              src={`/images/${item.image}`}
              alt={item.name}
              loading="lazy"
              decoding="async"
              referrerpolicy="same-origin"
              width="400"
              heigth="300"
            />
          </div>
          <Footer>
            <p>{item.name}</p>
            <div>
              <Button type="button" onClick={() => setFlip(false)}>
                Donation
              </Button>
            </div>
          </Footer>
        </>
      ) : (
        <Body>
          <Close onClick={() => setFlip(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </Close>
          <p>Select the amount to donate ({item.currency})</p>
          <Amount>{payments}</Amount>
          <Button
            type="button"
            onClick={(_evt) => {
              handlePay(item.id, selectedAmount, item.currency);
            }}
          >
            Pay
          </Button>
        </Body>
      )}
    </Container>
  );
});
