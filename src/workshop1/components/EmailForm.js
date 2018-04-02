import React, {Component} from 'react';
import PropTypes from 'prop-types';

import './EmailForm.css';

const INITIAL_FORM_STATE = {
  from: '',
  to: '',
  subject: '',
  message: ''
};

export default class EmailForm extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func
  }

  state = INITIAL_FORM_STATE;

  _updateFormState = (name, e) => {
    this.setState({[name]: e.target.value});
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    let {from, to, subject, message} = this.state;
    let {onSubmit} = this.props;

    if (from && to && subject && message) {
      onSubmit({from, to, subject, message});

      // reset form state to INITIAL
      this.setState(INITIAL_FORM_STATE);
    } else {
      alert('Please fill the form before submitting');
    }
  }

  _handleFromChange = (e) => {
    this.setState({from: e.target.value});
  }

  _handleFormClose = (e) => {
    this.setState(INITIAL_FORM_STATE);

    this.props.onClose();
  }

  _handleMessageChange = (e) => {
    this.setState({message: e.target.value});
  }

  render() {
    let {from, to, subject, message} = this.state;

    return (
      <form className="email-form" onSubmit={this._handleSubmit} method="post">
        <fieldset className="email-form__field">
          <label htmlFor="from" className="email-form__label">From:
          </label>
          <input
            type="email"
            id="from"
            placeholder="e.g sagiri@ebay.com"
            value={from}
            onChange={this
            ._updateFormState
            .bind(this, 'from')}
            className="email-form__input"/>
        </fieldset>
        <fieldset className="email-form__field">
          <label htmlFor="to" className="email-form__label">To:
          </label>
          <textarea
            id="to"
            placeholder="e.g ashok@yahoo.com"
            value={to}
            onChange={(e) => {
            this._updateFormState('to', e);
          }}
            className="email-form__input-message"/>
        </fieldset>
        <fieldset className="email-form__field">
          <label htmlFor="subject" className="email-form__label">Subject:
          </label>
          <textarea
            id="subject"
            placeholder="Enter your subject here"
            value={subject}
            onChange={this
            ._updateFormState
            .bind(this, 'subject')}
            className="email-form__input-message"/>
        </fieldset>
        <fieldset className="email-form__field">
          <label htmlFor="message" className="email-form__label">Message:</label>
          <textarea
            id="message"
            placeholder="[Enter your message here]"
            value={message}
            onChange={this
            ._updateFormState
            .bind(this, 'message')}
            className="email-form__input-message"/>
        </fieldset>
        <div className="email-form__button-bar ">
          <button type="submit">Send Mail</button>
          {
            this.props.onClose && <button onClick={this._handleFormClose}>Close</button>
          }
        </div>
      </form>
    );
  }
}
