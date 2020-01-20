import React, {Component} from "react";
import Button from "../../components/UI/button/button";
import Input from "../../components/UI/input/input";
import './auth.css';
import {validateEmail} from "../../form/form-library";
import {connect} from 'react-redux'
import {auth} from "../../store/actions/auth";

class Auth extends Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler =  () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      true
    );
  };

  registerHandler = () => {
    this.props.auth(
      this.state.formControls.email.value,
      this.state.formControls.password.value,
      false
    );
  };

  submitHandler = (event) => {
    event.preventDefault()
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid
    }
    return isValid
  };

  onchangeHandler = (event, name) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[name]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[name] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((controlName) => {
      isFormValid = formControls[controlName].valid && isFormValid
    });

    this.setState({formControls, isFormValid})
  };

  renderInputs = () => {

    return Object.keys(this.state.formControls).map((name, index) => {
      const control = this.state.formControls[name];
      return (
        <Input
          key={name + index}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          label={control.label}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.validation}
          onChange={(event) => this.onchangeHandler(event, name)}
        />
      )
    });
  };

  render() {
    return (
      <div className='auth'>
        <div>
          <h1>Авторизация</h1>
          <form
            className='auth-form'
            onSubmit={this.submitHandler}>
            {
              this.renderInputs()
            }
            <Button
              disabled={!this.state.isFormValid}
              type='success-btn'
              onClick={this.loginHandler}
            >Войти</Button>
            <Button
              disabled={!this.state.isFormValid}
              type='primary'
              onClick={this.registerHandler}
            >Зарегестрироваться</Button>
          </form>
        </div>
      </div>
    )
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin)),
  }
};

export default connect(null, mapDispatchToProps)(Auth)