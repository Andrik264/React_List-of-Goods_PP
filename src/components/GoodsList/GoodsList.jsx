/* eslint-disable react/no-did-update-set-state */
/* eslint-disable react/prop-types */
import React from 'react';

import { Good } from '../Good';

import './GoodsList.scss';

export class GoodsList extends React.PureComponent {
  state = {
    goods: [...this.props.goods],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.goods !== this.props.goods) {
      this.setState({ goods: this.props.goods });
    }
  }

  deleteProduct = (goodId) => {
    const goodsFromStorage = JSON.parse(window.localStorage.getItem('goods'));

    this.setState((state) => {
      const newGoods = goodsFromStorage
        ? goodsFromStorage.filter(good => good.id !== goodId)
        : state.goods.filter(good => good.id !== goodId);

      return { goods: newGoods };
    }, () => {
      window.localStorage.setItem('goods', JSON.stringify(this.state.goods));
    });
  }

  render() {
    const { goods } = this.state;
    const { selectProduct } = this.props;

    return (
      <div>
        <ul
          className="GoodsList"
        >
          {goods.map(good => (
            <li key={good.id} className="GoodsList__item">
              <Good
                key={good.id}
                good={good}
                deleteProduct={this.deleteProduct}
                selectProduct={selectProduct}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
