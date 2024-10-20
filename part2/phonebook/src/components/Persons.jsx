const Persons = ({ persons, filterName }) => {
  const personsToShow = persons.map(person => person.name.toLowerCase()).includes(filterName.toLowerCase())
    ? persons.filter(person => person.name.toLowerCase() === filterName.toLowerCase())
    : persons

  return (
    <div>
      {
        personsToShow.map(person =>
          <div key={person.name}>
            {person.name + ' ' + person.number}
          </div>
        )
      }
    </div>
  )
}

export default Persons