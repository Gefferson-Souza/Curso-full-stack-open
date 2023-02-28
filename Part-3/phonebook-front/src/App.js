import { useState, useEffect } from "react";
import SearchBar from "./Components/SearchBar";
import AddContact from "./Components/AddContact";
import Contacts from "./Components/Contacts";
import personService from "./services/Persons";
import Notification from "./Components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchBar, setSearchBar] = useState("");
  const [sucessMessage, setSucessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const hook = () => {
    personService
      .allData()
      .then((allPersons) => {
        setPersons(allPersons);
      });
  };

  useEffect(hook, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const filterPerson = persons.filter(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );
    if (filterPerson[0]) {
      if(window.confirm(`${newName} is already added, Want to replace de old number with the new one?`)){
        const findPerson = persons.find(p => p.id === filterPerson[0].id)
        const changedPerson = {...findPerson, number: newNumber}
        personService
          .update(findPerson.id, changedPerson)
          .then(updatedPerson => {
            setPersons(persons.map(p => p.id === findPerson.id ? updatedPerson : p))
            setSucessMessage(`${changedPerson.name} foi alterado com sucesso!`)
            setTimeout(() => {
              setSucessMessage(null)
            },5000)
          })
          .catch(error => {
            setErrorMessage(`${error.response.data.error}`)
            setTimeout(() => {
              setErrorMessage(null)
            },5000)
          })
      }   
    } else {
      const splitedName = newName.split(" ");
      const reformedName = splitedName
        .map((name) => {
          return name[0].toUpperCase() + name.substring(1);
        })
        .join(" ");

      const newPerson = { name: reformedName, number: newNumber };

      personService
        .create(newPerson)
        .then((person) => {
          setPersons(persons.concat(person));
          setNewName("");
          setNewNumber("");
          setSucessMessage(`${newPerson.name} foi adicionado com sucesso!`)
            setTimeout(() => {
              setSucessMessage(null)
            },5000)
      })
      .catch(error => {
        setErrorMessage(`${error.response.data.error} \n ${error.response.data.example ? error.response.data.example : ''}`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
    }
  };

  const onChangeSearchBar = (e) => {
    const { value } = e.target;
    const firstLetter = value.charAt(0).toUpperCase();
    const reformedValue = firstLetter + value.slice(1);
    setSearchBar(reformedValue);
  };

  const filteredPersons = persons.filter(
    (person) => person.name.indexOf(searchBar) !== -1
  );

  const deletePerson = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Do you really want to delete ${person.name} ??`)){
      personService
      .del(id)
      .then((deletedPerson) => {
        setPersons(persons.filter((p) => p !== person))
        setSucessMessage(`${person.name} foi deletado com sucesso!`)
            setTimeout(() => {
              setSucessMessage(null)
            },5000)
     })
      .catch(error => {
        setErrorMessage(`${error.response.data.error}`)
        setTimeout(() => {
          setErrorMessage(null)
        },5000)
      })
      setPersons(persons.filter((p) => p !== person))
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={sucessMessage} error={errorMessage} />
      <SearchBar value={searchBar} onChange={onChangeSearchBar} />
      <AddContact
        handleSubmit={handleSubmit}
        valueName={newName}
        nameOnChange={(e) => setNewName(e.target.value)}
        valueNumber={newNumber}
        numberOnChange={(e) => setNewNumber(e.target.value)}
      />
      <h2>Numbers</h2>
      <Contacts
        contacts={searchBar ? filteredPersons : persons}
        onClick={deletePerson}
      />
    </div>
  );
};

export default App;
