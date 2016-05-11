
const initialState = {
  showSidebar: null,
  filter: ''
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'NOTES_SHOW_SIDEBAR':
      return {
        ...state,
        showSidebar: action.showSidebar
      };

    case 'NOTES_SET_FILTER':
      return {
        ...state,
        filter: action.filter
      };

    default:
      return state;
  }
};

