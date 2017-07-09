import React from 'react';
import PropTypes from 'prop-types';
import Cake from './Cake';

const CakeList = props =>
  (<div className="CakeList">
    {props.cakes.map(cake => <Cake key={cake.id} editAction={props.editAction} {...cake} />)}
  </div>);

CakeList.propTypes = {
  cakes: PropTypes.arrayOf(
    PropTypes.shape({
      editItem: PropTypes.func,
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    }),
  ).isRequired,
  editAction: PropTypes.func.isRequired,
};

export default CakeList;
