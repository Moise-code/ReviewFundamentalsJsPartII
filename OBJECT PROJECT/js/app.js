//EventListeners
function eventListeners(){
    const showBtn = document.getElementById("show-btn");
    const questionCard = document.querySelector(".question-card");
    const closeBtn = document.querySelector(".close-btn");
    const form = document.getElementById("question-form");
    const feedback = document.querySelector(".feedback");
    const questionInput = document.getElementById("question-input");
    const answerInput = document.getElementById("answer-input");
    const questionList = document.getElementById("questions-list");
    let data = [];
    let id = 1;

    //new ui instance
    const ui = new UI();
    //show question form
    showBtn.addEventListener('click', function(){
        ui.showQuestion(questionCard);
        
    });
    //hide question form
    closeBtn.addEventListener('click', function(){
        ui.hideQuestion(questionCard)
    });

    //add question
    form.addEventListener('submit', function(e){
        e.preventDefault();
        const questionValue = questionInput.value;
        const answerValue = answerInput.value;

        if(questionValue === '' || answerValue === ''){
            feedback.classList.add('showItem', 'alert-danger');
            feedback.textContent = 'Can\'t add empty value ';

            setTimeout(function(){
                feedback.classList.remove('alert-danger', 'showItem');
            }, 3000);
        }else{
            const question = new Question(id, questionValue, answerValue);
            data.push(question);
            id++;

            ui.addQuestion(questionList, question);
            ui.clearFields(questionInput, answerInput);
        }


    });
    //work with a question
    questionList.addEventListener('click', function(e){
        e.preventDefault();
        if(e.target.classList.contains('delete-flashcard')){
            let id = e.target.dataset.id;
            questionList.removeChild(e.target.parentElement.parentElement.parentElement);
            //rest of the data
            let tempData = data.filter(function(item){
                return item.id !== parseInt(id)
            });
            data = tempData;
            //console.log(data);
            
        }else if(e.target.classList.contains('show-answer')){
            e.target.nextElementSibling.classList.toggle('showItem');
        }else if(e.target.classList.contains('edit-flashcard')){
            //delete trhe questipn from the dom
            let id = e.target.dataset.id;
            questionList.removeChild(e.target.parentElement.parentElement.parentElement);
            //show the question card
            ui.showQuestion(questionCard);
            //specific question
            const tempQuestion = data.filter(function(item){
                return item.id === parseInt(id);
            });
            //rest of the data
            let tempData = data.filter(function(item){
                return item.id !== parseInt(id)
            });
            data = tempData;
            console.log(tempQuestion);
            questionInput.value = tempQuestion[0].title;
            answerInput.value = tempQuestion[0].title;

        }
    });

}

//UI Constructor
function UI(){}

//show question card
UI.prototype.showQuestion = function(element){
    element.classList.add('showItem');
}

//show question card
UI.prototype.hideQuestion = function(element){
    element.classList.remove('showItem')
}

//add Question
UI.prototype.addQuestion = function(element, question){
    const div = document.createElement('div');
    div.classList.add('col-md-4');
    div.innerHTML = `
    <div class="card card-body flashcard my-3">
    <h4 class="text-capitalize">${question.title}</h4>
    <a href="#" class="text-capitalize my-3 show-answer">show/hide answer</a>
    <h5 class="answer mb-3">${question.answer}</h5>
    <div class="flashcard-btn d-flex justify-content-between">

     <a href="#" id="edit-flashcard" class=" btn my-1 edit-flashcard text-uppercase" data-id="${question.id}">edit</a>
     <a href="#" id="delete-flashcard" class=" btn my-1 delete-flashcard text-uppercase" data-id="${question.id}">delete</a>
    </div>
   </div>
    `;
    element.appendChild(div);
}


//clear fields
    UI.prototype.clearFields = function(question, answer){
        question.value = '';
        answer.value = '';
    }



//Question Constructor
function Question(id, title, answer){
    this.id = id;
    this.title = title;
    this.answer = answer;

}


//dom event listener
document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});