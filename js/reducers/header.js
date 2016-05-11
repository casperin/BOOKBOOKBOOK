
const initialState = {
  error: null,
  loading: null
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'LOADING':
      return {
        ...state,
        loading: action.text
      };

    case 'ERROR':
      return {
        ...state,
        error: action.text
      };

    default:
      return state;
  }
}
