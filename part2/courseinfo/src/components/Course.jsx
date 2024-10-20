const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}

const Part = ({ part, exercises }) => {
  return (
    <p>{part} {exercises}</p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Total = ({ course }) => {
  return (
    <b>Number of exercises {course.parts.reduce((total, part) => total + part.exercises, 0)}</b>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default Course