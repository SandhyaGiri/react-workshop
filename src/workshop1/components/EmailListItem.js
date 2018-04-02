import React, {Component} from 'react';
import {EMAIL_PROP_TYPE} from './constants.js';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './EmailListItem.css';

const EmailListItemStatus = ({read, isSelected, onDelete, onMarkUnread}) => {
  let emailListItemStatusComponent = null;

  if (read && isSelected) {
    emailListItemStatusComponent = (
      <article className="email-list-item__status">
        <button onClick={onDelete}>Delete</button>
        <button onClick={onMarkUnread}>Mark Unread</button>
      </article>
    );
  } else {
    emailListItemStatusComponent = (
      <article className="email-list-item__status">
        <button onClick={onDelete}>Delete</button>
      </article>
    );
  }

  return emailListItemStatusComponent;
}

export default class EmailListItem extends Component {
  // declare types of expected props i.e. the component's interface
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onSelect: PropTypes.func,
    onDelete: PropTypes.func,
    isSelected: PropTypes.bool,
    onMarkUnread: PropTypes.func
  }

  _handleClick = (e) => {
    console.log(e);

    let {onSelect, email} = this.props;

    if (onSelect) {
      e.stopPropagation();
      onSelect(email.id);
    }
  }

  _handleDelete = (e) => {
    let {onDelete, email} = this.props;

    if (onDelete) {
      e.stopPropagation();
      onDelete(email.id);
    }
  }

  _handleMarkUnread = (e) => {
    let {onMarkUnread, email} = this.props;

    if (onMarkUnread) {
      e.stopPropagation();
      onMarkUnread(email.id);
    }
  }

  render() {
    let {
      email: {
        from,
        subject,
        read
      },
      isSelected
    } = this.props;
    let className = classNames('email-list-item', {'email-list-item--selected': isSelected}, {'email-list-item--unread': !read});
    //let {from, subject} = this.props;

    return (
      <div className={className} onClick={this._handleClick}>
        <span>{from}</span>
        <span>{subject}</span>
        <EmailListItemStatus
          isSelected={isSelected}
          read={read}
          onDelete={this._handleDelete}
          onMarkUnread={this._handleMarkUnread}/>
      </div>
    );
  }
}
