import React, {Component} from 'react';
import PropTypes from 'prop-types';
import EmailList from './components/EmailList';
import EmailView from './components/EmailView';
import EmailForm from './components/EmailForm';

import './App.css';

const EmailFormWrapper = ({showForm, onSubmit, onClose}) => {
  let emailFormComponent = null;

  if (showForm) {
    emailFormComponent = (
      <div className="app__form-modal">
        <div className="app__form">
          <EmailForm onSubmit={onSubmit} onClose={onClose}/>
        </div>
      </div>
    );
  }

  return emailFormComponent;
}

const EmailViewWrapper = ({selectedEmail, onClose, onDelete, onMarkUnread, onMarkRead}) => {
  let emailViewComponent = null;
  if (selectedEmail) {
    // You can store components in variables like below
    emailViewComponent = (
      <article className="app__view">
        <EmailView
          email={selectedEmail}
          onClose={onClose}
          onDelete={onDelete}
          onMarkUnread={onMarkUnread}
          onMarkRead={onMarkRead}/>
      </article>
    );
  }
  return emailViewComponent;
}

export default class App extends Component {
  static propTypes = {
    pollInterval: PropTypes.number
  }

  static defaultProps = {
    pollInterval: 2000
  }

  state = {
    emails: [],
    selectedEmailId: -1,
    showForm: false
  }

  componentDidMount() {
    // the DOM for sure exists!
    this._getUpdatedEmails();

    // Poll every 2seconds for new emails
    this._pollId = setInterval(this._getUpdatedEmails, 2000);
  }

  componentWillUnmount() {
    // To prevent any memory leaks
    clearInterval(this._pollId);
  }

  _handleShowForm = () => {
    this.setState({showForm: true});
  }

  _handleFormClose = () => {
    this.setState({showForm: false});
  }

  _setUnread = (emailId, read = true) => {
    // Make a PUT request to update read state
    fetch(`//localhost:9090/emails/${emailId}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
        body: JSON.stringify({read})
      })
      .then(res => res.json())
      .then(({success}) => {
        if (success) {
          this._getUpdatedEmails();
        } else {
          throw new Error(`Unable to set email ID# ${emailId} read state to ${read}.`);
        }
      })
      .catch(ex => console.error(ex));
  }

  _handleItemMarkUnread = (emailId) => {
    this._setUnread(emailId, false);
  }

  _handleItemMarkRead = (emailId) => {
    this._setUnread(emailId);
  }

  _getUpdatedEmails = () => {
    fetch('//localhost:9090/emails').then((res) => res.json()).then((emails) => {
      this.setState({emails})
    }).catch((ex) => {
      console.error(ex);
    });
  }

  _handleItemSelect = (selectedEmailId) => {
    this.setState({selectedEmailId: selectedEmailId});
    this._handleItemMarkRead(selectedEmailId);
  }

  _handleItemDelete = (emailIdToDelete) => {
    fetch('//localhost:9090/emails/' + emailIdToDelete, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        this._getUpdatedEmails();
        this.setState({selectedEmailId: -1});
      } else {
        throw new Error("Unable to add email");
      }
    }).catch((ex) => console.error(ex));
  }

  _handleEmailViewClose = () => {
    this.setState({selectedEmailId: -1});
  }

  _handleFormSubmit = (newEmail) => {
    fetch('//localhost:9090/emails', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newEmail)
    }).then((res) => res.json()).then((data) => {
      if (data.success) {
        this._getUpdatedEmails();
        this.setState({showForm: false});
      } else {
        throw new Error("Unable to add email");
      }
    }).catch((ex) => console.error(ex));

    // this.setState({emails: newEmails});  -- This is an asynchrnous setState , and
    // you are not guaranteed to be updating the old setState this.setState(
    // (prevState) => { let {emails} = prevState; let emailLength = emails.length;
    // let newEmails = [...emails, {id: emailLength+1,date: new
    // Date().toDateString(), ...newEmail}]; return {emails: newEmails} })
  }

  render() {
    let {selectedEmailId, emails, showForm} = this.state;
    let selectedEmail = emails.find(email => email.id === selectedEmailId);

    return (
      <main className="app">
        <div className="app__page">
          <div className="app__list">
            <EmailList
              emails={emails}
              onItemSelect={this._handleItemSelect}
              onItemDelete={this._handleItemDelete}
              selectedEmailId={selectedEmailId}
              onItemMarkUnread={this._handleItemMarkUnread}/>
          </div>
          {// Conditional rendering {emailViewComponent} {selectedEmail && <EmailView
          // email={selectedEmail}/>}}
          }
          <EmailViewWrapper
            selectedEmail={selectedEmail}
            onClose={this._handleEmailViewClose}
            onDelete={this
            ._handleItemDelete
            .bind(this, selectedEmailId)}
            onMarkUnread={this._handleItemMarkUnread}
            onMarkRead={this._handleItemMarkRead}/>

          <button className="app__new-email" onClick={this._handleShowForm}>
            +
          </button>
          <EmailFormWrapper showForm={showForm} onSubmit={this._handleFormSubmit} onClose={this._handleFormClose}/>
        </div>
      </main>
    );
  }
}