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
      width: 600,
      height: 800,
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
      {this.props.locked ? null : this.editHeader()}

      {this.state.editing
        ? <textarea value={this.state.notes} ref='textarea' style={{width: this.state.width, height: this.state.height}} onChange={::this.onChange} />
        : <div className='book-notes' ref='display'><ReactMarkdown source={this.props.notes} transformLinkUri={uri => `/tags/${uri}`} /></div>}
    </div>);
  }

  editHeader () {
    if (!this.state.editing) return <div className='edit-header'><button onClick={::this.edit}>Edit</button></div>;

    return (<div className='edit-header'>
      <button onClick={::this.save}>Save</button>
    </div>);
  }

  onChange (e) {
    this.setState({notes: e.target.value});
  }

  edit () {
    const {width, height} = this.refs.display.getBoundingClientRect();
    this.setState({
      editing: true,
      width: Math.max(width - 20, 300),
      height: Math.max(height, 200),
      notes: this.props.notes
    });
  }

  save () {
    const modification = {notes: this.refs.textarea.value};
    this.props.modifyBook(bookId(this.props.book), modification)
    this.setState({editing: false, notes: null});
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

