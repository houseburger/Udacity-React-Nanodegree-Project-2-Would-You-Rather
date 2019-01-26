import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import QuestionUnanswered from './QuestionUnanswered'
import QuestionAnswered from './QuestionAnswered'

// TODO: get param from URL later on w/Router
let paramId = 'loxhs1bqm25b708cmbf3g' // = unanswered question
// let paramId = '6ni6ok3ym7mf1p33lnez' // = answered question


class Question extends Component {

  render() {
    let { question, alreadyAnswered } = this.props

    return(
      <div>
        <h3 className='text-center'>Would You Rather...</h3>

        <br></br>

        {/* Gonna pass paramId & question via ownProps in Redux, so that can do the logic behind it just once instead of twice! */}
        {alreadyAnswered === true
          ? <QuestionAnswered paramId={paramId} question={question} />
          : <QuestionUnanswered paramId={paramId} question={question} />
        }

      </div>
    )
  }
}

function mapStateToProps({ questions, authedUser, users }) {

  // get loggedin user's answers keys, so that can see whether already answered or not
  let user = _.pick(users, authedUser.id)[authedUser.id]
  let answersKeys = Object.keys(user.answers)

  return {
    question: _.pick(questions, paramId)[paramId],
    alreadyAnswered: _.includes(answersKeys, paramId),
    authedUser,
    // JUST FOR TESTING, can delete again later!
    users,
    questions,
  }
}

export default connect(mapStateToProps)(Question)
