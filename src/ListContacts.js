import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import escapeRegExp from 'escape-string-regexp';
import sortBy from 'sort-by';

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
  showAll = () => {
    this.setState({query:''});
  }
  render(){

    const {contacts, onDeleteContact} = this.props;
    const {query} = this.state;

    let searchedContacts;
    if(query){
      let match = new RegExp(escapeRegExp(query),"i");
      searchedContacts = contacts.filter((contact)=>match.test(contact.name))
    }
    else{
      searchedContacts = contacts;
    }
    searchedContacts = searchedContacts.sort(sortBy("name"));
    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            value={query}
            onChange={(event)=>this.updateQuery(event.target.value)}
            placeholder="Search contacts"
          />
          <Link
          to="/create"
          className="add-contact"
          />
        </div>
        {searchedContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>Now showing {searchedContacts.length} of {contacts.length} total</span>
            <button onClick={this.showAll}>Show all</button>
          </div>
          )
        }
        <ol className="contact-list">
          {searchedContacts.map((contact)=>(
            <li key={contact.id} className="contact-list-item">
              <div className="contact-avatar" style={{
                backgroundImage: `url(${contact.avatarURL})`
              }}/>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <div onClick={()=>onDeleteContact(contact)} className="contact-remove" />
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
