const InputForm = (props) => {
  return (
    <div>
      <label htmlFor={props.id} name={props.name}>
        {props.name}
      </label>
      <input
        required
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        id={props.id}
      />
    </div>
  );
};

const AddContact = (props) => {
  return (
    <form
      style={{ padding: "5px", margin: "0.5rem" }}
      onSubmit={props.handleSubmit}
    >
      <InputForm
        name="Name:"
        value={props.valueName}
        onChange={props.nameOnChange}
        id='name'
      />
      <InputForm
        name="Number:"
        value={props.valueNumber}
        onChange={props.numberOnChange}
        id='number'
      />
      <button type="submit">ADD</button>
    </form>
  );
};

export default AddContact;
