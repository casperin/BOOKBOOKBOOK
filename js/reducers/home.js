
const initialState = {
  foo: 'bar'
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'HOME_MODIFY':
      return {...state, ...action.modification};

    default:
      return state;
  }
}

