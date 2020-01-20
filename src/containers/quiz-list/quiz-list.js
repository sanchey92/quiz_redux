import React, {Component} from "react";
import './quiz-list.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/loader/loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

 class QuizList extends Component {

  componentDidMount() {
    this.props.fetchQuizes()
  }

  renderQuizes = () => {
    return this.props.quizes.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            {quiz.name}
          </NavLink>
        </li>
      )
    })
  };

  render() {
    return (
      <div className='quiz-list'>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0
            ? <Loader/>
            : <ul>
              {this.renderQuizes()}
            </ul>}

        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {quizes, loading} = state.quiz;
   return {
     quizes,
     loading
   }
};

 const mapDispatchToProps = (dispatch) => {
   return {
     fetchQuizes: () => dispatch(fetchQuizes())
   }
 };

 export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
