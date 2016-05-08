import React from 'react';
import QuickStats from './quickstats';
import {update, actions} from '../store/state';
import {$id, $title, $info} from '../util/book';
import filter from '../util/iters/filter';
import map from '../util/iters/map';
import to from '../util/iters/to';

export default class HashTag extends React.Component {
  render () {
    return (<div className='page show-hash-tag-container'>

      <div className='hash-tag-header'>
        <div className='main'>
          <button onClick={_ => {update(actions.showHashTag, null)}}>Back</button>
        </div>
        <QuickStats books={this.props.books} />
      </div>

      <div className='hash-tag-container'>
        <h1>{this.props.tag}</h1>
        <div className='notes-container'>
          {this.renderNotes()}
        </div>
      </div>

    </div>);
  }

  renderNotes (books) {
    const tag = this.props.tag;
    const notes = this.props.books
      ::filter(b => b.notes)
      ::filter(b => b.notes.includes(tag))
      ::map(b => ({
        id: $id(b),
        title: $title(b),
        notes: b.notes.split('\n\n').filter(n => n.includes(tag)),
        image: $info(b).imageLinks.thumbnail
      }))
      ::to(Array)

    return (<div>
      {notes.map(this.renderBookObject.bind(this))}
    </div>);
  }

  renderBookObject ({id, title, notes, image}) {
    return (<div className='book' key={id}>
      <div className='info'>
        <h2>{title}</h2>
        <img src={image} />
      </div>
      <div className='notes'>
        {notes.map(this.renderNote)}
      </div>
    </div>);
  }

  renderNote (note, i) {
    return <div className='note' key={i}>{note}</div>;
  }
}

