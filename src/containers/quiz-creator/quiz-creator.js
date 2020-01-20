import React, {Component, Fragment} from "react";
import Button from "../../components/UI/button/button";
import {createFormControl, validate, validateForm} from "../../form/form-library";
import './quiz-creator.css'
import Input from "../../components/UI/input/input";
import Select from "../../components/UI/select/select";
import {connect} from 'react-redux'
import {createQuizQuestion, finishCreateQuiz} from "../../store/actions/create";

class QuizCreator extends Component {

  state = {
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControl()
  };

  submitHandler = (event) => {
    event.preventDefault();

  };

  addQuestion = (event) => {
    event.preventDefault();

    const {question, option1, option2, option3, option4} = this.state.formControls;

    const questionItem = {
      question: question.value,
      id: this.props.quiz.length + 1,
      rightAnswerId: this.state.rightAnswerId,
      answers: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    };

    this.props.createQuizQuestion(questionItem);

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl()
    })
  };

  createQuiz = (event) => {
    event.preventDefault();

    this.setState({
      isFormValid: false,
      rightAnswerId: 1,
      formControls: createFormControl()
    });

    this.props.finishCreateQuiz();

  };

  changeHandler = (value, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.touched = true;
    control.value = value;
    control.valid = validate(control.value, control.validation);
    formControls[controlName] = control;

    this.setState({
      formControls,
      isFormValid: validateForm(formControls)
    })
  };

  renderControl = () => {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Fragment key={index}>
          <Input
            key={index}
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            touched={control.touched}
            errorMessage={control.errorMessage}
            onChange={(event) => this.changeHandler(event.target.value, controlName)}
          />
          {index === 0 ? <hr/> : null}
        </Fragment>
      )
    })
  };

  selectChangeHandler = (event) => {
    this.setState({
      rightAnswerId: +event.target.value
    })
  };

  render() {

    const select = <Select
      label='Выберете правильный ответ:'
      value={this.state.rightAnswerId}
      onChange={this.selectChangeHandler}
      options={[
        {text: 1, value: 1},
        {text: 2, value: 2},
        {text: 3, value: 3},
        {text: 4, value: 4}
      ]}
    />;

    return (
      <div className='quiz-creator'>
        <div>
          <h1>Cоздание теста</h1>
          <form onSubmit={this.submitHandler}>
            {
              this.renderControl()
            }
            {select}
            <Button
              disabled={!this.state.isFormValid}
              type='primary'
              onClick={this.addQuestion}
            >Добавить вопрос
            </Button>
            <Button
              disabled={this.props.quiz.length === 0}
              type='success-btn'
              onClick={this.createQuiz}
            >Создать тест
            </Button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    quiz: state.create.quiz
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createQuizQuestion: (item) => dispatch(createQuizQuestion(item)),
    finishCreateQuiz: () => dispatch(finishCreateQuiz())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)