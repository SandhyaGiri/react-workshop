import React, {Component} from 'react';
import EmailListItem from './EmailListItem'
import PropTypes from 'prop-types';

import {EMAIL_PROP_TYPE} from './constants.js';

import './EmailList.css';

export default class EmailList extends Component {
  static propTypes = {
    emails : PropTypes.arrayOf(EMAIL_PROP_TYPE).isRequired,
    selectedEmailId : PropTypes.number.isRequired,
    onItemSelect : PropTypes.func.isRequired,
    onItemDelete : PropTypes.func.isRequired,
    onItemMarkUnread : PropTypes.func.isRequired
  }
  render() {
    let {emails, selectedEmailId, onItemDelete, onItemSelect, onItemMarkUnread} = this.props;
    let emailComponents = emails.map((email) => (
        <li key={email.id} className="email-list__item">
        <EmailListItem
          email={email}
          onSelect={onItemSelect}
          onDelete={onItemDelete}
          isSelected={email.id === selectedEmailId}
          onMarkUnread={onItemMarkUnread}
        />
        </li>
      )
    )



    return (
      <ul className="email-list">
        {emailComponents}
      </ul>
    );
  }
}
