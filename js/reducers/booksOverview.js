const initialState = {
  tab: 'all',
  filter: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'BOOKS_OVERVIEW_MODIFY':
      return {...state, ...action.modification};

    default:
      return state;
  }
}


