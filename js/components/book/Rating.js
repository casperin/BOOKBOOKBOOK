import React from 'react';
import classname from 'classname';

export default props => {
  const rate = props.rate || function () {};
  const klass = classname('rating-component', `rated-${props.rating}`, {unrated: !props.rating});
  switch (props.rating) {
    case 0: return <div className={klass}>{s(rate, 1)}{s(rate, 2)}{s(rate, 3)}{s(rate, 4)}{s(rate, 5)}</div>
    case 1: return <div className={klass}>{S(rate, 1)}{s(rate, 2)}{s(rate, 3)}{s(rate, 4)}{s(rate, 5)}</div>
    case 2: return <div className={klass}>{S(rate, 1)}{S(rate, 2)}{s(rate, 3)}{s(rate, 4)}{s(rate, 5)}</div>
    case 3: return <div className={klass}>{S(rate, 1)}{S(rate, 2)}{S(rate, 3)}{s(rate, 4)}{s(rate, 5)}</div>
    case 4: return <div className={klass}>{S(rate, 1)}{S(rate, 2)}{S(rate, 3)}{S(rate, 4)}{s(rate, 5)}</div>
    case 5: return <div className={klass}>{S(rate, 1)}{S(rate, 2)}{S(rate, 3)}{S(rate, 4)}{S(rate, 5)}</div>
    default: return <div className={klass}>{s(rate, 1)}{s(rate, 2)}{s(rate, 3)}{s(rate, 4)}{s(rate, 5)}</div>
  }
}

const s = (rate, rating) => <div className='star empty' onClick={_ => rate(rating)}>&#9734;</div>
const S = (rate, rating) => <div className='star full'  onClick={_ => rate(rating)}>&#9733;</div>
