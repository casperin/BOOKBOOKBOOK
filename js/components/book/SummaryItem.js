import React from 'react';
import {human} from '../../util/date';
import cx from 'classname';

class SummaryItem extends React.Component {
  constructor (props) {
    super(props);
    this.state = {editing: false};
  }

  render () {
    const {type, value, label, editable, extra} = this.props;

    return (<div className={cx('book-summary-item-component', {muted: !value, editable})} onClick={this.onEdit.bind(this)}>
      <div className='label'>{label}</div>
      {this.state.editing
        ? <input type={type} defaultValue={value} ref='input' onBlur={this.onBlur.bind(this)} />
        : <div className='value'>{type === 'date' ? human(value) : value}</div>}

      {extra ? <small>({extra})</small> : null}
    </div>);
  }

  onEdit (e) {
    if (!this.props.editable) return;
    this.setState({editing: true});
    window.setTimeout(_ => this.refs.input.focus(), 1);
  }

  onBlur (e) {
    this.props.onChange(e.target.value);
    this.setState({editing: false});
  }
}

export default SummaryItem;

