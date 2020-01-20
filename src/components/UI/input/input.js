import React from "react";
import './input.css'

const isInvalid = ({valid, touched, shouldValidate}) => {
  return !valid && shouldValidate && touched
};

const Input = (props) => {

  const inputType = props.type || 'text';
  const cssClasses = ['input'];
  const htmlFor = `${inputType}-${Math.random()}`;

  if (isInvalid(props)) {
    cssClasses.push('invalid')
  }
  return (
    <div className={cssClasses.join(' ')}>
      <label htmlFor={htmlFor}>{props.label}</label>
      <input
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
        type={inputType}/>
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Введите верное значение'}</span>
          : null
      }

    </div>
  )
};

export default Input