const Header = ({ courseName }) => {
  return <h2>{courseName}</h2>;
};

const Part = ({ name, exercises }) => {
  return (
    <p>
      <strong>{name}</strong>, exercises: {exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  const allParts = parts.map((part) => {
    return <Part name={part.name} exercises={part.exercises} key={part.id} />;
  });
  return <div>{allParts}</div>;
};

const Total = ({ allExercises }) => {
  const exercises = allExercises.reduce((s, n) => n.exercises + s, 0);
  return <h4>Total of Exercises: {exercises}</h4>;
};

const Course = ({ course }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Header courseName={course[0].name} />
      <Content parts={course[0].parts} />
      <Total allExercises={course[0].parts} />
      <Header courseName={course[1].name} />
      <Content parts={course[1].parts} />
      <Total allExercises={course[1].parts} />
    </div>
  );
};

export default Course;
