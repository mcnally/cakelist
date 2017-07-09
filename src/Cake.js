import React from 'react';
import PropTypes from 'prop-types';
import './Cake.css';

const Cake = ({ id, title, desc, image, editAction }) =>
  (<div className="Cake">
    <div className="Cake-image-container" style={{ backgroundImage: `url('${image}')` }} />
    <div className="Cake-text-container">
      {title}
      <div className="Cake-description">
        {desc}
      </div>
    </div>
    <div className="Cake-action-container">
      <button
        onClick={() => {
          editAction({ id, title, desc, image });
        }}
      >
        Edit
      </button>
    </div>
  </div>);

Cake.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  editAction: PropTypes.func.isRequired,
};

export default Cake;
