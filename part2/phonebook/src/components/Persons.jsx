const Persons = ({ persons, filterName, deletePerson }) => {
  const personsToShow = persons.map(person => person.name.toLowerCase()).includes(filterName.toLowerCase())
    ? persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())
    : persons

  return (
    <div>
      {
        personsToShow.map(person =>
          <div key={person.name}>
            {person.name + ' ' + person.number}
            <button onClick={() => deletePerson(person.id)}>delete</button>
          </div>
        )
      }
    </div>
  )
}

export default Persons