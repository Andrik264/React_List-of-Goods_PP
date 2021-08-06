/* eslint-disable react/prop-types */
import React from 'react';
import { GoodsList } from './GoodsList';
import { ModalForm } from './ModalForm';

export class HomePage extends React.PureComponent {
  state = {
    goods: [...this.props.products],
    isSortedByName: false,
  };

  sortByName = () => {
    const { goods, isSortedByName } = this.state;

    if (isSortedByName) {
      this.setState({ isSortedByName: false });
    } else {
      const sortedGoods = [...goods].sort(
        (cur, next) => cur.name.localeCompare(next.name),
      );

      this.setState(state => ({
        goods: sortedGoods,
        isSortedByName: !state.isSortedByName,
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
        this.setState(state => ({
          goods: [...this.props.products],
        }));
    }
  }

  render() {
    const { goods } = this.state;
    const { selectProduct, addNewGood } = this.props;

    return (
      <>
        <div>
          <button type="button" onClick={this.sortByName}>
            Sort by Name
          </button>
          <select name="quantitySort" onChange={this.sortByQuantity}>
            <option defaultValue="default">No Sort</option>
            <option value="increase">Sort by increase</option>
            <option value="decrease">Sort by decrease</option>
          </select>

          <ModalForm
            // if you want to see new products
            // at the begin of list - use goods[0].id + 1
            // if in at the end - goods[goods.length - 1].id + 1
            newGoodId={goods[goods.length - 1].id + 1}
            buttonText="New Product"
            modalTitle="Fill in all the fields to submit"
            onSubmit={addNewGood}
          />
        </div>
        <div>List of Goods</div>
        <GoodsList
          goods={goods}
          selectProduct={selectProduct}
        />
      </>
    );
  }
}
