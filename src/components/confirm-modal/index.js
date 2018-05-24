import React from "react";
import "./index.css";
import cx from "classnames";

const ConfirmModal = ({ message, confirm, cancel, show = true }) => (
  <div className={cx("confirmModalContainer", { hidden: !show })}>
    <div className="confirmModal">
      <h1>{message}</h1>
      <div className="controls">
        <div>
          <button className="cancel" onClick={cancel}>
            Cancel
          </button>
        </div>
        <div>
          <button className="confirm" onClick={confirm}>
            I'm Sure
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default ConfirmModal;
