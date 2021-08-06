/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

export const Good = ({ good, deleteProduct, selectProduct }) => {
  const { id, quantity, name, title, price, image } = good;

  return (
    <div key={id} className="card" style={{ width: '18rem' }}>
      <img src={image} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{title}</p>
        <div className="card-priceAndQuantity">
          <span>{`Price: ${price}$`}</span>
          <span>{`Quantity: ${quantity}`}</span>
        </div>

        <div className="card-buttons">
          <Link
            to={`/Product/${id}`}
            className="btn btn-primary"
            onClick={() => selectProduct(id)}
          >
            Details
          </Link>

          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target={`#Item${id}`}
          >
            Delete this product
          </button>
        </div>

        <div
          className="modal fade"
          id={`Item${id}`}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Confirm that you want to delete the item
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                />
              </div>

              <div className="modal-body">
                {`Are you sure that you want to delete "${title}"?!`}
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() => deleteProduct(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
