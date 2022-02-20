/*
https://opentdb.com/api.php?amount=10&category=26&difficulty=medium&type=multiple
https://opentdb.com/api.php?amount=10&type=boolean
*/

let section = document.getElementById("section");

    section.innerHTML = `<div class="quiz-header">
            <h2 class="quiz-head">quiz app</h2>
        </div>
        <div  class="choose">
            <ul class="choose-list">
                <li class="choose-list-item">
                <h3 class="choose-list-item-head">select number of questions</h3>
                <input type="number" name="" id="numberOfQuestions" class="select" value="0">
                </li>
                <li class="choose-list-item">
                <h3 class="choose-list-item-head">Select Category:</h3>               
                <select name="" id="SelectCategory" class="select">
                    <option value=" " class="select-item" selected disabled> Category</option>
                    <option value="9" class="select-item">General Knowledge</option>
                    <option value="10" class="select-item">Entertainment: Book</option>
                    <option value="11" class="select-item">Entertainment: Film</option>
                    <option value="12" class="select-item">Entertainment: Music</option>
                    <option value="23" class="select-item">History</option>
                    <option value="27" class="select-item">Animals</option>
                </select>
                </li>
                <li class="choose-list-item">
                <h3 class="choose-list-item-head">Select Difficulty:</h3>               
                <select name="" id="SelectDifficulty" class="select">
                    <option value=" " class="select-item" selected disabled>Any Difficulty</option>
                    <option value="easy" class="select-item">Easy</option>
                    <option value="medium" class="select-item">Medium</option>
                    <option value="hard" class="select-item">Hard</option>
                </select>
                </li>
                <li class="choose-list-item">
                <h3 class="choose-list-item-head">Select Type:</h3>               
                <select name="" id="SelectType" class="select">
                    <option value=" " class="select-item" selected disabled>Any Type</option>
                    <option value="multiple" class="select-item">Multiple Choice</option>
                    <option value="boolean" class="select-item">True/False</option>
                </select>
                </li>
            </ul>
        </div>
        <div class="button button-start">
            <button class="btn  select" id="Start-button">start quiz</button>
        </div>
        <div class="button-end button">
            <button class="btn  select" id="end-button">End quiz</button>
        </div>
        <div class="button-try button">
            <button class="btn  select" id="try-button">try again</button>
        </div>`
        ;

let chooseDiv = document.querySelector(".choose"),
    chooseList = document.querySelector(".choose-list"),
    numberOfQuestions = document.getElementById("numberOfQuestions"),
    SelectCategory = document.getElementById("SelectCategory"),
    SelectDifficulty = document.getElementById("SelectDifficulty"),
    SelectType = document.getElementById("SelectType"),
    StartButton = document.getElementById("Start-button"),
    endButton = document.getElementById("end-button"),
    startDiv = document.querySelector(".button-start"),
    endDiv = document.querySelector(".button-end"),
    tryDiv = document.querySelector(".button-try"),
    correctCount = 0,
    falseCount = 0,
    correctAnswersArray = [],
    chooseAnswersArray = [];
    // answerObject = {};
    let amount, category, difficulty, type;
      
/*************************************************************************************** */
numberOfQuestions.onchange = function () {
    if (numberOfQuestions.value > 0) { 
        amount = numberOfQuestions.value;
    }
    else {
        swal("Enter Valid Number Of Qustions");
    }
}

SelectCategory.onchange = function () {
     category = SelectCategory.value;
};

SelectDifficulty.onchange = function () {
    difficulty = SelectDifficulty.value;
};

SelectType.onchange = function () {
    type = SelectType.value;
};

/*********************************************************************/
// let multiText = 
/*********************************************************************/

  

StartButton.onclick = function () {             //1
    amount = numberOfQuestions.value;
    fetch(
        `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    )
        .then((repo) => repo.json())
        .then(e => {                             //2
            chooseList.innerHTML = "";
            startDiv.style.display = "none"
            endDiv.style.display = "block"
            let results = e.results;
            console.log(results);
            results.map((el) => {                //3               
                let inCorrectAnswers = el.incorrect_answers;
                if (type == "multiple") {        //4
                    chooseList.innerHTML += `
            <li class="choose-list-item">
                <h3 class="choose-list-item-head">${chooseList.childElementCount + 1} - ${el.question}</h3>
                <div class="answers" id="${chooseList.childElementCount + 1}">
                <div class="answer" >
                <label for="${el.correct_answer}">${el.correct_answer}</label>
                <input type="radio" name="${chooseList.childElementCount + 1}" id="${el.correct_answer}" value="${el.correct_answer}" class="question">
                </div>
                            <div class="answer">
                <label for="${inCorrectAnswers[0]}">${inCorrectAnswers[0]}</label>
                <input type="radio" name="${chooseList.childElementCount + 1
                        }" id="${inCorrectAnswers[0]}" value="${inCorrectAnswers[0]
                        }" class="question">
                            </div>
                            <div class="answer">
                <label for="${inCorrectAnswers[1]}">${inCorrectAnswers[1]}</label>
                <input type="radio" name="${chooseList.childElementCount + 1
                        }" id="${inCorrectAnswers[1]}" value="${inCorrectAnswers[1]
                        }" class="question">
                            </div>
                            <div class="answer">
                            <label for="${inCorrectAnswers[2]}">${inCorrectAnswers[2]
                        }</label>
                            <input type="radio" name="${chooseList.childElementCount + 1
                        }" id="${inCorrectAnswers[2]}" value="${inCorrectAnswers[2]
                        }" class="question">
                            </div>
                        </div>
                    </li>
                `;
                    // correctAnswersArray.push({ id:chooseList.childElementCount  , correctAnswer: el.correct_answer});
                }   //4
                else {   //5
                    chooseList.innerHTML += `
                     <li class="choose-list-item">
                <h3 class="choose-list-item-head">${
                  chooseList.childElementCount + 1
                } - ${el.question}</h3>
              <div class="answers" id="${chooseList.childElementCount + 1}">
                <div class="answer" >
                <label for="${el.correct_answer}">${el.correct_answer}</label>
                <input type="radio" name="${
                  chooseList.childElementCount + 1
                }" id="${el.correct_answer}" value="${
                      el.correct_answer
                    }" class="question">
                </div>
                            <div class="answer">
                <label for="${inCorrectAnswers[0]}">${
                      inCorrectAnswers[0]
                    }</label>
                <input type="radio" name="${
                  chooseList.childElementCount + 1
                }" id="${inCorrectAnswers[0]}" value="${
                      inCorrectAnswers[0]
                    }" class="question">
                            </div>
                        </div>
                    </li>`;
                }        //5
                 correctAnswersArray.push({
                   id: chooseList.childElementCount,
                   correctAnswer: el.correct_answer,
                 });
                let inputRadios = [...document.querySelectorAll(".question")];
                inputRadios.map((inputRadio, index) => {     //6
                    inputRadio.onchange = function (e) {
                        let answerObject = {};
                        answerObject.id = e.currentTarget.name;
                        answerObject.answer = `${e.currentTarget.value}`;
                        chooseAnswersArray.map((el, index) => {
                            if (el.id == e.currentTarget.name) {
                                answerObject.answer = `${e.currentTarget.value}`;
                                chooseAnswersArray.splice(index , 1)
                            }
                        })
                        chooseAnswersArray = [...chooseAnswersArray, answerObject];
                      console.log(chooseAnswersArray);
                    } //7
                })  //6
            }) //3
        }) //2
    }//1

 /*********************************************** */
 
       
        endButton.onclick = function () {
        correctAnswersArray.map((correctAnswer , index) => {
          let element = chooseAnswersArray.find(
            (chooseAnswer) => correctAnswer.id == chooseAnswer.id
          );
          console.log(element);
            if (correctAnswer.correctAnswer == element.answer) {
                   correctCount ++
                  
              }
              else {                 
               falseCount ++
              }
        });            
            console.log(correctCount, falseCount);
               chooseList.innerHTML = "";
               endDiv.style.display = "none";
            tryDiv.style.display = "block";
            chooseList.style.cssText =
              "text-align:center; font-size:25px; margin:50px auto; flex-direction: row;";
            chooseList.innerHTML = `You have answered <span>${correctCount}</span>  correct Answers of <span> ${amount} </span> questions `;
}

tryDiv.onclick = function () {
                location.reload()
}
    
/*
                <div class="answers" id="${chooseList.childElementCount + 1}">
                <div class="answer" >
                <label for="${el.correct_answer}">${el.correct_answer}</label>
                <input type="radio" name="${
                  chooseList.childElementCount + 1
                }" id="${el.correct_answer}" value="${
                      el.correct_answer
                    }" class="question">
                </div>
                            <div class="answer">
                <label for="${inCorrectAnswers[0]}">${
                      inCorrectAnswers[0]
                    }</label>
                <input type="radio" name="${
                  chooseList.childElementCount + 1
                }" id="${inCorrectAnswers[0]}" value="${
                      inCorrectAnswers[0]
                    }" class="question">
                            </div>
                        </div>
*/