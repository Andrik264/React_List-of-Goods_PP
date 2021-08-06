import React from 'react';
import { Switch, Route } from 'react-router-dom';

import products from './API/products.json';

import { GoodsList } from './components/GoodsList';
import { ModalForm } from './components/ModalForm';
import { ProductDetails } from './components/ProductDetails/ProductDetails';

import './App.scss';
import './styles/general.scss';

function getSelectedProductIdFromURL(URL) {
  const arr = URL.split('/');

  if (arr.length > 0) {
    return +arr[arr.length - 1];
  }

  return undefined;
}

class App extends React.Component {
  goodsFromStorage = JSON.parse(window.localStorage.getItem('goods'));

  state = {
    goods: this.goodsFromStorage || [...products],
    selectedProductId: getSelectedProductIdFromURL(
      window.location.pathname,
    ) || 0,
    isSortedByName: false,
  };

  componentDidMount() {
    if (!this.goodsFromStorage) {
      window.localStorage.setItem('goods', JSON.stringify(products));

      this.goodsFromStorage = JSON.parse(window.localStorage.getItem('goods'));
    }
  }

  newStateGoods = (newGoods) => {
    this.setState({ goods: newGoods });
  }

  sortByName = () => {
    const { goods, isSortedByName } = this.state;

    if (isSortedByName) {
      this.setState({
        isSortedByName: false,
        goods: this.goodsFromStorage,
      });
    } else {
      const sortedGoods = [...goods].sort(
        (cur, next) => cur.name.localeCompare(next.name),
      );

      this.setState(({
        goods: sortedGoods,
        isSortedByName: true,
      }));
    }
  }

  sortByQuantity = (event) => {
    const { value } = event.target;
    const { goods } = this.state;
    const goodsCopy = [...goods];

    switch (value) {
      case 'increase':
        goodsCopy.sort(
          (cur, next) => cur.quantity - next.quantity,
        );
        this.newStateGoods(goodsCopy);
        break;

      case 'decrease':
        goodsCopy.sort(
          (cur, next) => next.quantity - cur.quantity,
        );
        this.newStateGoods(goodsCopy);
        break;

      default:
        this.newStateGoods(this.goodsFromStorage);
    }
  }

  addNewGood = (newGood) => {
    this.setState(state => ({
      goods: [...state.goods, newGood],
    }), () => {
      const stringifiedGoods = JSON.stringify(this.state.goods);

      window.localStorage.setItem('goods', stringifiedGoods);
    });
  }

  selectProduct = (selectedProductId) => {
    this.setState({ selectedProductId });
  }

  render() {
    const { selectedProductId, goods } = this.state;
    const selectedProduct = goods.find(
      product => product.id === selectedProductId,
    );

    return (
      <Switch>
        <Route path={`/Product/${selectedProductId}`}>
          <ProductDetails
            initialProducts={products}
            selectedProduct={selectedProduct}
          />
        </Route>

        <Route path="/" exact>
          <>
            <div className="top-panel">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.sortByName}
              >
                Sort by Name
              </button>
              <select
                name="quantitySort"
                className="btn btn-primary"
                onChange={this.sortByQuantity}
              >
                <option defaultValue="default">Default</option>
                <option value="increase">Sort ascending</option>
                <option value="decrease">Sort descending</option>
              </select>

              <ModalForm
                // if you want to see new products
                // at the begin of list - use goods[0].id + 1
                // if in at the end - goods[goods.length - 1].id + 1
                newGoodId={goods[goods.length - 1].id + 1}
                buttonText="New Product"
                modalTitle="Fill in all the fields to submit"
                onSubmit={this.addNewGood}
              />
            </div>
            <div>List of Goods</div>
            <GoodsList
              goods={goods}
              selectProduct={this.selectProduct}
            />
          </>
        </Route>

        {/* <Redirect to="/" /> */}
      </Switch>
    );
  }
}

export default App;
