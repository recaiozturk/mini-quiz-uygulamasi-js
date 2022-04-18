function Question(text,choices,answer){
    this.text=text;
    this.choices=choices;
    this.answer=answer;
}

var q1= new Question("What is the best programming",["C#","js","pyhton","asp.net"],"js");

var q2=new Question("What is the most populer programming",["visual basic","js","c","asp.net"],"js");

var q3= new Question("What is the best modern programing",["visual basic","js","c","asp.net"],"js");

var questions=[q1,q2,q3];

//question prototype
Question.prototype.checkAnswer= function(answer){
    return this.answer===
    answer;
}

//Quiz Constructer
function Quiz(questions){
    this.questions=questions;
    this.score=0;
    this.questionIndex=0;
}

//Quiz Prototype
Quiz.prototype.getQuestion=function(){
    return this.questions[this.questionIndex]
}

//quiz is finish
Quiz.prototype.isFinish=function(){
    return this.questions.length===this.questionIndex;
}

//quiz guess
Quiz.prototype.guess=function(answer){
    var question=this.getQuestion();
    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

//Start Quiz
var quiz=new Quiz(questions);

loadQuestions();

function loadQuestions(){
    if(quiz.isFinish()){
    showScore();
    }
    else{
        var question=quiz.getQuestion();
        var choices=question.choices;
        document.querySelector('#question').textContent=question.text;

        for(var i=0;i<choices.length;i++){
            var element=document.querySelector('#choice'+i);
            element.innerHTML=choices[i];

            guess('btn'+i,choices[i]);
        }

        showProgress();
    }
}

function guess(id,guess){
    var btn=document.getElementById(id);
    btn.onclick=function(){
        quiz.guess(guess);
        loadQuestions();
    }
}

function showScore(){
    var html=`<h2>Score</h2><h4>${quiz.score}</h4>`

    document.querySelector('.card-body').innerHTML=html;

}

function showProgress(){
    var totalQuestion=quiz.questions.length;
    var questionNumber=quiz.questionIndex+1;
    document.querySelector('#progress').innerHTML='Question '+questionNumber+'of'+totalQuestion;
}
