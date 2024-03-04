import fetch from 'isomorphic-fetch';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Card from './components/Card';
import { summaryDonations } from './helpers';

const Main = styled.main`
  max-width: 64rem;
  margin: 0 auto;
`;

const H1 = styled.h1`
  font-size: 1.5rem;
  line-height: 2rem;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  text-align: center;
`;

const CardList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;

  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

export default connect((state) => state)(
  class App extends Component {
    state = {
      charities: [],
      selectedAmount: 10,
    };

    componentDidMount() {
      const self = this;
      fetch('http://localhost:3001/charities')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          console.log(data);
          self.setState({ charities: data });
        });

      fetch('http://localhost:3001/payments')
        .then(function (resp) {
          return resp.json();
        })
        .then(function (data) {
          self.props.dispatch({
            type: 'UPDATE_TOTAL_DONATE',
            amount: summaryDonations(data.map((item) => item.amount)),
          });
        });
    }

    render() {
      const self = this;
      const cards = this.state.charities.map(function (item, i) {
        return (
          <Card
            defaultSelectedAmount={self.state.selectedAmount}
            key={i}
            item={item}
          />
        );
      });

      const style = {
        color: 'red',
        margin: '1em 0',
        fontWeight: 'bold',
        fontSize: '16px',
        textAlign: 'center',
      };

      const donate = this.props.donate;
      const message = this.props.message;

      return (
        <Main>
          <H1>Tamboon React</H1>
          <p>All donations: {donate}</p>
          {message && <p style={style}>{message}</p>}

          <CardList>{cards}</CardList>
        </Main>
      );
    }
  }
);
