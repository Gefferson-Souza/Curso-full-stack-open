const Contacts = (props) => {

  return (
    <ul style={{listStyle: 'none'}}>
      {props.contacts.map((contact) => (
        <li style={{ marginTop: "5px" }} key={contact.id}>
          {contact.name} <button style={{borderRadius: '40%', cursor: 'pointer', border: 0, backgroundColor: 'rgb(239 68 68)'}} onClick={() => props.onClick(contact.id)}>Delete</button>
          <br />
          {contact.number}
          
        </li>
      ))}
    </ul>
  );
};

export default Contacts;
