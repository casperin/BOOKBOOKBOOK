import React from 'react';

export default props => {
  switch (props.rating) {
    case 0: return <div className='stars-container'>{s(props, 1)}{s(props, 2)}{s(props, 3)}{s(props, 4)}{s(props, 5)}</div>
    case 1: return <div className='stars-container'>{S(props, 1)}{s(props, 2)}{s(props, 3)}{s(props, 4)}{s(props, 5)}</div>
    case 2: return <div className='stars-container'>{S(props, 1)}{S(props, 2)}{s(props, 3)}{s(props, 4)}{s(props, 5)}</div>
    case 3: return <div className='stars-container'>{S(props, 1)}{S(props, 2)}{S(props, 3)}{s(props, 4)}{s(props, 5)}</div>
    case 4: return <div className='stars-container'>{S(props, 1)}{S(props, 2)}{S(props, 3)}{S(props, 4)}{s(props, 5)}</div>
    case 5: return <div className='stars-container'>{S(props, 1)}{S(props, 2)}{S(props, 3)}{S(props, 4)}{S(props, 5)}</div>
    default: return <div className='stars-container'>{s(props, 1)}{s(props, 2)}{s(props, 3)}{s(props, 4)}{s(props, 5)}</div>
  }
}

const s = (props, rating) => <div className='star empty' onClick={_ => props.rate(rating)}>&#9734;</div>
const S = (props, rating) => <div className='star full'  onClick={_ => props.rate(rating)}>&#9733;</div>

