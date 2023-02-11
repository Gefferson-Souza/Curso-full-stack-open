const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ name, exercise }) => {
  return (
    <p>
      <strong>{name}</strong>, exercises: {exercise}
    </p>
  );
};

const Content = (props) => {
  const [part1, part2, part3] = props.allParts;
  return (
    <div>
      <Part name={part1.name} exercise={part1.exercises} />
      <Part name={part2.name} exercise={part2.exercises} />
      <Part name={part3.name} exercise={part3.exercises} />
    </div>
  );
};

const Total = (props) => {
  return <p>Total amount of exercises {props.allExercises}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  const allParts = course.parts;
  const allExercises = allParts[0].exercises + allParts[1].exercises + allParts[2].exercises;

  return (
    <div>
      <Header course={course.name} />
      <Content allParts={allParts} />
      <Total allExercises={allExercises} />
    </div>
  );
};

export default App;
