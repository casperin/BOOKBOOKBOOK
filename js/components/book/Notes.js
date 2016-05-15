import React from 'react';
import {connect} from 'react-redux';
import {modifyBook} from '../../actions/book';
import {bookId, bookInfo} from '../../util/book';
import weave from '../../util/weave';
import to from '../../util/to';
import ReactMarkdown from 'react-markdown';

class BookNotes extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      editing: false,
      notes: null
    };
  }

  componentWillReceiveProps (props) {
    const showNewBook = bookId(this.props.book) !== bookId(props.book);
    if (this.state.editing && showNewBook) {
      this.save();
    }
  }

  render () {
    if (!this.props.book) return null;

    return (<div className='book-notes-component'>
      {this.props.locked ? null : <div className='edit-header'><button onClick={::this.edit}>Edit</button></div>}
      <div className='book-notes'><ReactMarkdown source={this.props.notes} transformLinkUri={uri => `/tags/${uri}`} /></div>

      {this.editOverlay()}
    </div>);
  }

  editOverlay () {
    if (!this.state.editing) return null;
    return (<div className='book-notes-edit-container'>
      <textarea value={this.state.notes} ref='textarea' onChange={::this.onChange} onKeyDown={::this.onKeyDown} />
      <button onClick={::this.save}>Save</button>
    </div>);
  }

  onChange (e) {
    this.setState({notes: e.target.value});
  }

  onKeyDown ({key, metaKey}) {
    if (key === 'Escape') this.cancel();
    if (key === 'Enter' && metaKey) this.save();
  }

  edit () {
    this.setState({
      editing: true,
      notes: this.props.notes
    });
  }

  save () {
    const modification = {notes: this.refs.textarea.value};
    this.props.modifyBook(bookId(this.props.book), modification)
    this.setState({editing: false, notes: null});
  }

  cancel () {
    this.setState({
      editing: false,
      notes: null
    });
  }
}

const mapStateToProps = (_, {book, notes, highlight}) => {
  notes = notes || book && book.notes || '';
  if (!highlight) return {notes};

  const highlightsRegex = new RegExp(highlight.trim(), "ig");

  return {
    notes: notes.replace(highlightsRegex, "**$&**")
  }
};

export default connect(mapStateToProps, {modifyBook})(BookNotes);

