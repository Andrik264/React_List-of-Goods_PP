/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

import { getProductComments } from '../../API/api';
import { CommentsList } from '../CommentsList/CommentsList';
import { ModalForm } from '../ModalForm';

import './Details.scss';

function getProductByUrl(url) {
  const goodIdFromUrl = url.split('/');
  const goodsFromStorage = JSON.parse(window.localStorage.getItem('goods'));

  return goodsFromStorage.find(
    good => good.id === goodIdFromUrl[goodIdFromUrl.length - 1],
  );
}

export class ProductDetails extends React.Component {
  state = {
    selectedProduct: this.props.selectedProduct
      || getProductByUrl(window.location.pathname),
    comments: null,
    name: '',
    email: '',
    body: '',
  }

  componentDidMount() {
    const { selectedProduct } = this.state;

    getProductComments(selectedProduct.id)
      .then(comments => this.setState({ comments }));
  }

  editProduct = (newGood) => {
    this.setState({
      selectedProduct: newGood,
    }, () => {
      const { selectedProduct } = this.state;

      const goodsFromStorage = JSON.parse(window.localStorage.getItem('goods'))
        || this.props.initialProducts;

      const updatedGoods = goodsFromStorage.map((good) => {
        if (good.id === selectedProduct.id) {
          return selectedProduct;
        }

        return good;
      });

      window.localStorage.setItem('goods', JSON.stringify(updatedGoods));
    });
  }

  commentsRender = () => {
    const { comments } = this.state;

    if (comments === null) {
      return <p>Comments are loading from server</p>;
    }

    if (comments.length === 0) {
      return <p>No comments for this product</p>;
    }

    return true;
  }

  onChange = (event) => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  addComment = (event) => {
    event.preventDefault();
    const { comments, name, email, body } = this.state;
    const newComment = {
      id: comments.length + 1,
      name,
      email,
      body,
      createdAt: new Date(),
    };

    this.setState(prevState => ({
      comments: [newComment, ...prevState.comments],
      name: '',
      email: '',
      body: '',
    }));
  }

  render() {
    const { selectedProduct, comments } = this.state;
    const {
      id, image, name, title, price, description, quantity,
    } = selectedProduct;
    const { email, body } = this.state;

    return (
      <div className="container">
        <div className="ProductDetails">
          <div className="ProductDetails__photo-section">
            <img
              src={image}
              alt="Product"
              className="ProductDetails__img"
            />
          </div>

          <div className="ProductDetails__info">
            <h2>{name}</h2>
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="ProductDetails__priceAndQuantity">
              <p>{`Quantity: ${quantity}`}</p>
              <p>{`Price: ${price}$`}</p>
            </div>

            <div className="ProductDetails__buttons">
              <Link to="/" className="btn btn-primary">Back</Link>
              <ModalForm
                buttonText="Edit"
                modalTitle="Fill in all the fields to save"
                onSubmit={this.editProduct}
                id={id}
                product={selectedProduct}
              />
            </div>
          </div>

        </div>

        <div className="container comments">
          <form className="comments__form" onSubmit={this.addComment}>
            <div className="form-group">
              <div>
                <label>
                  Username
                  <input
                    className="form-control"
                    rows="3"
                    type="text"
                    name="name"
                    value={this.state.name}
                    onChange={this.onChange}
                    required
                    minLength="5"
                  />
                </label>
              </div>

              <div>
                <label>
                  Email
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    required
                  />
                </label>
              </div>

              <div>
                <label>
                  Comment body
                  <textarea
                    className="form-control"
                    type="text"
                    minLength="5"
                    name="body"
                    value={body}
                    onChange={this.onChange}
                    required
                  />
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-primary ">
              Add comment
            </button>
          </form>
          {comments === null
            ? <p>Comments are loading from server</p>
            : <CommentsList comments={comments} />
          }
        </div>
      </div>
    );
  }
}
