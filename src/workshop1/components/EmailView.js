import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {EMAIL_PROP_TYPE} from './constants.js';

import './EmailView.css';

const EmailViewButtonBar = ({read, onMarkUnread, onMarkRead, onClose, onDelete}) => {
  let emailViewButtonComponent = null;
  let markUnreadReadButton = read
    ? (
      <button onClick={onMarkUnread}>Mark Unread</button>
    )
    : (
      <button onClick={onMarkRead}>Mark Read</button>
    );

  emailViewButtonComponent = (
    <div className="email-view__button-bar">
      {markUnreadReadButton}
      <button name="Close" onClick={onClose}>Close</button>
      <button name="Delete" onClick={onDelete}>Delete</button>
    </div>
  );
  return emailViewButtonComponent;
}

export default class EmailView extends Component {
  static propTypes = {
    email: EMAIL_PROP_TYPE.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    onMarkUnread: PropTypes.func,
    onMarkRead: PropTypes.func
  }

  _handleClose = (e) => {
    let {onClose} = this.props;

    if (onClose) {
      e.stopPropagation();
      onClose();
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

  _handleMarkRead = (e) => {
    let {onMarkRead, email} = this.props;

    if (onMarkRead) {
      e.stopPropagation();
      onMarkRead(email.id);
    }
  }

  render() {
    let {email} = this.props;
    let {subject, from, date, message, read} = email;
    let rawMessage = {
      __html: message
    };

    return (
      <div className="email-view">
        <h1>{subject}</h1>
        <h2>
          <a href={'mailto:' + from}>{from}</a>
        </h2>
        <h3>{date}</h3>
        <div dangerouslySetInnerHTML={rawMessage}/>
        <EmailViewButtonBar
          read={read}
          onMarkRead={this._handleMarkRead}
          onMarkUnread={this._handleMarkUnread}
          onClose={this._handleClose}
          onDelete={this._handleDelete}/>
      </div>
    );
  }
}
