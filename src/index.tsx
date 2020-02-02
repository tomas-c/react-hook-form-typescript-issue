import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import ReactDOM from "react-dom";

import "./index.css";

type FormFieldArray = {
  name: string;
};

type FormData = {
  // Correct typing but doesn't work for errors.fieldArray
  fieldArray?: FormFieldArray[];
};

function App() {
  const { register, control, handleSubmit, formState, errors, reset } = useForm<
    FormData
  >({
    defaultValues: {
      fieldArray: []
    }
  });

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: "fieldArray"
    }
  );

  const onSubmit = (data: FormData) => {
    console.log("data", data);

    // We cannot safely run the code below because
    // it can throw if there are no items in the array
    // because react-hook-form returns undefined as the field value
    // console.log("data", data.fieldArray.map(it => it));

    // And if we use "fieldArray?: FormFieldArray[];" 
    // or "fieldArray: FormFieldArray[] | undefined;"
    // then below doesn't work with typescript 3.7.5
    if (errors.fieldArray && errors.fieldArray.length) {
      console.log("error", errors.fieldArray[0].name);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Field Array </h1>
      <ul>
        {fields.map((item, index) => {
          return (
            <li key={item.id}>
              <input
                name={`fieldArray[${index}].name`}
                defaultValue={item.name}
                ref={register({ required: true })}
              />
              <button onClick={() => remove(index)}>Delete</button>
            </li>
          );
        })}
      </ul>
      <input type="submit" />
    </form>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);