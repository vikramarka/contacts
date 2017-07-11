import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListContacts extends Component{
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }
  state = {
    query:""
  }
  updateQuery = (queryString)=>{
    this.setState({query:queryString.trim()})
  }
  render(){
    return (
      <div className="contact-list">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            value={this.state.query}
            onChange={(event)=>this.updateQuery(event.target.value)}
            placeholder="Search contacts"
          />
        </div>
        <ol className="list-contacts">
          {this.props.contacts.map((contact)=>(
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <div onClick={()=>this.props.onDeleteContact(contact)} className="contact-remove" />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
