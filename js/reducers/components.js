import {combineReducers} from 'redux';
import home from './home';
import header from './header';
import booksOverview from './booksOverview';
import notes from './notes';

export default combineReducers({home, header, notes, booksOverview});
