const Header = (props) => {
    return <h1>{props.name}</h1>;
  };
  
  const Part = (props) => {
    return (
      <p>
        {props.name} {props.exercises}
      </p>
    );
  };
  
  const Content = ({ parts }) => {
    const partsList = parts.map((x) => {
      return <Part key={x.id} name={x.name} exercises={x.exercises} />;
    }); 
  
    return (
      <div>
        {partsList}
      </div>
    );
  };
  
  const Total = ({ parts }) => {
    const total = parts.reduce((sum, x) => sum + x.exercises, 0);
  
    return (
      <p>
        <strong>Total of {total} exercises</strong>
      </p>
    );
  };
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    );
  };
  export default Course