/* eslint-disable react/prop-types */
import React from 'react';
import { AddGoodInput } from '../AddGoodInput';

function validURL(str) {
  const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
    + '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
    + '((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
    + '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
    + '(\\?[;&a-z\\d%_.~+=-]*)?' // query string
    + '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return !!pattern.test(str);
}

const initialState = {
  quantity: 0,
  name: '',
  title: '',
  price: 0,
  description: '',
  image: '',
  isQuantityValid: null,
  isPriceValid: null,
  isNameValid: null,
  isTitleValid: null,
  isImageValid: null,
  isFormValid: false,
};

function isProductGiven(stateKey, product) {
  // if it is editing of existing product
  // it will return the value of key to AddGoodForm state
  if (product) {
    return product[stateKey];
  }

  return false;
}

export class AddGoodForm extends React.Component {
  // if function isProductGiven return false - it will take second parameter
  state = {
    id: isProductGiven('id', this.props.product)
    || this.props.goodId,
    quantity: isProductGiven('quantity', this.props.product) || 0,
    name: isProductGiven('name', this.props.product) || '',
    title: isProductGiven('title', this.props.product) || '',
    price: isProductGiven('price', this.props.product) || 0,
    description: isProductGiven('description', this.props.product) || '',
    image: isProductGiven('image', this.props.product) || '',
    isQuantityValid: this.props.product ? true : null,
    isPriceValid: this.props.product ? true : null,
    isNameValid: this.props.product ? true : null,
    isTitleValid: this.props.product ? true : null,
    isImageValid: this.props.product ? true : null,
  }

  clearForm = (newState) => {
    this.setState(newState);
  }

  onChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        if (value.length > 5) {
          this.setState({ isNameValid: true });
        } else {
          this.setState({ isNameValid: false });
        }

        break;

      case 'title':
        if (value.length > 10) {
          this.setState({ isTitleValid: true });
        } else {
          this.setState({ isTitleValid: false });
        }

        break;

      case 'price':
        if (value > 0) {
          this.setState({ isPriceValid: true });
        } else {
          this.setState({ isPriceValid: false });
        }

        break;

      case 'quantity':
        if (value > 0) {
          this.setState({ isQuantityValid: true });
        } else {
          this.setState({ isQuantityValid: false });
        }

        break;

      case 'image':
        if (validURL(value)) {
          this.setState({ isImageValid: true });
        } else {
          this.setState({ isImageValid: false });
        }

        break;

      default:
        this.setState({ [name]: value });
    }

    this.setState({ [name]: value });
  }

  formValidate = () => {
    const {
      isQuantityValid, isPriceValid, isNameValid, isTitleValid, isImageValid,
    } = this.state;

    if (isQuantityValid
      && isPriceValid
      && isNameValid
      && isTitleValid
      && isImageValid
    ) {
      return true;
    }

    return false;
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { id, name, title, description, price, quantity, image } = this.state;
    const newGood = {
      id,
      name,
      title,
      description,
      price,
      quantity,
      image,
    };

    this.props.onSubmit(newGood);

    // if product is given - it souuld not increase id
    // because it was editing but not creating a new one
    if (!this.props.product) {
      this.setState(state => ({
        id: state.id + 1,
        quantity: 0,
        name: '',
        title: '',
        price: 0,
        description: '',
        image: '',
        isQuantityValid: null,
        isPriceValid: null,
        isNameValid: null,
        isTitleValid: null,
        isImageValid: null,
      }));
    }
  }

  render() {
    const {
      quantity, name, title, price, description, image,
      isNameValid, isTitleValid, isImageValid, isQuantityValid, isPriceValid,
    } = this.state;

    const { product } = this.props;

    return (
      <section className="AddGoodForm__section">
        <form method="post" onSubmit={this.onSubmit}>
          <AddGoodInput
            inputType="text"
            inputName="name"
            placeholder="Name of the product"
            value={name}
            onChange={this.onChange}
            isRequired="true"
            isValid={isNameValid}
          />

          <AddGoodInput
            inputType="text"
            inputName="title"
            placeholder="Short description"
            value={title}
            onChange={this.onChange}
            isRequired="true"
            isValid={isTitleValid}
          />

          <AddGoodInput
            inputType="text"
            inputName="description"
            placeholder="Full description"
            value={description}
            onChange={this.onChange}
            isRequired="false"
          />

          <AddGoodInput
            inputType="number"
            inputName="price"
            placeholder="The price in $"
            value={price}
            onChange={this.onChange}
            isRequired="true"
            isValid={isPriceValid}
          />

          <AddGoodInput
            inputType="number"
            inputName="quantity"
            placeholder="quantity"
            value={quantity}
            onChange={this.onChange}
            isRequired="true"
            isValid={isQuantityValid}
          />

          <AddGoodInput
            inputType="url"
            inputName="image"
            placeholder="The image URL address"
            value={image}
            onChange={this.onChange}
            isRequired="false"
            isValid={isImageValid}
          />

          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            // if product exists we reset fields to initialDetails
            onClick={() => (product
              ? this.clearForm(product.initialDetails)
              : this.clearForm(initialState)
            )}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            data-bs-dismiss="modal"
            disabled={!this.formValidate()}
          >
            Save
          </button>
        </form>
      </section>
    );
  }
}
