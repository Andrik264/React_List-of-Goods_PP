/* eslint-disable react/prop-types */
import React from 'react';
import { AddGoodForm } from '../AddGoodForm';

export const ModalForm = ({
  buttonText, modalTitle, onSubmit, newGoodId, product,
}) => (
  <div className="AddGoodForm">
    <button
      type="button"
      className="btn btn-primary"
      data-bs-toggle="modal"
      data-bs-target="#AddGoodForm"
    >
      {buttonText}
    </button>

    <div
      className="modal fade"
      id="AddGoodForm"
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
              {modalTitle}
            </h5>
          </div>
          <div className="modal-body">
            <AddGoodForm
              goodId={newGoodId}
              onSubmit={onSubmit}
                // if product is giver - fileds are valid for default
                // otherwise field is waiting onChange and then will
                // check if it is valid
              product={product && {
                ...product,
                initialDetails: { ...product },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);
