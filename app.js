class Question {
    constructor(text, choices, answer) {
        this.text = text
        this.choices = choices
        this.answer = answer
     }

     checkAnswer(answer){
        return this.answer === answer
     }

  }


class Quiz {

    constructor(questions){
        this.questions = questions
        this.score = 0
        this.questionIndex = 0
    }

    getQuestion(){
        return this.questions[this.questionIndex]
    }

    isFinish(){
        return this.questions.length===this.questionIndex
    }

    guess(answer){
        let question = this.getQuestion()
        if(question.checkAnswer(answer)){
            this.score++
        }
        this.questionIndex++
    }
}


let q1 = new Question('What is the most popular language?',['js','python','php'], 'js')
let q2 = new Question('What is the best web framework?',['Django','Larvel','Flask'],'Django')
let q3 = new Question('which is the largest planet in our solar system?',['Earth','Jupiter','Venus'],'Jupiter')

let questions = [q1,q2,q3]
let quiz = new Quiz(questions)

loadQuestion()

function loadQuestion(){
    if(quiz.isFinish()){
        showScore()
    }else{
        let question = quiz.getQuestion()
        let choices = question.choices
        document.querySelector('#question').textContent = question.text

        for(let i=0; i<choices.length; i++){
            let element = document.querySelector('#choice'+i)
            element.innerHTML = choices[i]
            guess('btn'+i, choices[i])
        }
        showProgress()
    }
}

function guess(id, guess){
    let btn = document.getElementById(id)
    btn.onclick = function(){
        quiz.guess(guess)
        loadQuestion()
    }
}

function showScore(){
    let html = '<h2>Score</h2><h4>'+quiz.score+'</h4>'
    document.querySelector('.card-body').innerHTML = html
}

function showProgress(){
    let totalQuestion = quiz.questions.length
    let questionNumber = quiz.questionIndex+1
    document.querySelector('#progress').innerHTML = 'Question '+questionNumber+' of'+totalQuestion
}

