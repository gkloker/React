import React, {useState} from "react";

const useSelect = (stateInitial, options) => {

  //state del custom hook
  const [state, updateState] = useState(stateInitial);

  const SelectNews = () => (
    <select
      className="browser-default"
      value={state}
      onChange={e => updateState(e.target.value)}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </select>
  );

  // return lo que el usuario seleccione y la funcion
  return [state, SelectNews];
}

export default useSelect;