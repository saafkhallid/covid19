//--------------------selectors-----------------:

var testButton = document.getElementById('start-btn')
var sectionQuestion = document.getElementById('container')
var informationSection = document.getElementById('information')
var saaf = document.querySelectorAll('.steppe h1')
var nextButton = document.getElementById('next-btn')
var question = document.getElementById('nextQuestion')
var selectInputs = document.querySelector('.answer')
var buttPrevious = document.getElementById('pré-btn')
var progressBar = document.getElementsByClassName('progress')
var serialPlus = document.querySelector('.question-number')
var bar = document.querySelector('.bar')
var resultMessage=document.querySelectorAll("#information p")
var titre=document.querySelector(".container__titre")


let QuestionIndex=0;
let QuetionNom={};



//---------------------evenemment-------------------:
testButton.addEventListener('click' , Test)
nextButton.addEventListener('click',nextQuetion)
selectInputs.addEventListener('change',typeOfButton)







//-----------------------début de test--------------:
function Test(){
    testButton.classList.add('hide')
    sectionQuestion.classList.remove('hide')
    informationSection.classList.add('hide')
    saaf[0].classList.remove('actuel')
    saaf[1].classList.add('actuel')



                               
   nextButton.disabled=true;

 
   control()
}

//--------------------------- Question suivant -----------------------:


QuestionIndex=0

 function nextQuetion(){
     if (QuestionIndex<21) {
         
     

    QuestionIndex++

    showQuestion( questions[ QuestionIndex])
    progressButtons( QuestionIndex)

    nextButton.disabled=true;

    control()

    finTest(QuestionIndex)
     }
     if (QuestionIndex === 21){
       
        nextButton.innerHTML='terminer le test';
        nextButton.classList.add('result');
        const  heroTest = document.querySelector('.result');
        heroTest.addEventListener('click',comptQuetion);
       
    
    }else{

        nextButton.innerHTML='suivant';
    }
}




 





//-----------------------------   afficher les question----------------------

function showQuestion(questions){

    question.innerText=questions.question
    selectInputs.innerHTML = ''


    if(questions.input.type==='radio'){

      questions.input.answer.forEach(answer =>{

        selectInputs.innerHTML += 
         `<div>
        <input type="radio"  name="choix" id="${answer.text}">
        <label for="${answer.text}">
            <i class="fa ${ answer.icon}"></i>
            <span>${answer.text}</span> </label>
        </div>
        `

      })
    
    }else{

        selectInputs.innerHTML=` <input type="number"  id="${questions.input.name}"
         min="${questions.input.min}" max="${questions.input.max}" placeholder=" ${questions.input.min}- ${questions.input.max}">
        <span class="input-span">${questions.input.name}</span>`
        
    }


}



//------------------------- question précedant ----------------------------:

buttPrevious.addEventListener('click',()=>{

    QuestionIndex--
     
    showQuestion( questions[ QuestionIndex])

    progressButtons( QuestionIndex)

    nextButton.disabled=true 

    control()
})


//---------------------controle progress bar----------------------:

function progressButtons(number){


    const addNumber = number + 1 ;
    serialPlus.innerHTML= addNumber ;

    bar.style.width =`calc(${addNumber}*calc(100%/22))` 

   
}



//----------------------------inclickuble & clickable button--------------:
function typeOfButton(event){

    const input=event.target
 
    
if (input.type === 'number') {


        const number = parseFloat(input.value)
                    
        if (number >= input.min && number <= input.max) {

            nextButton.disabled = false
            QuetionNom[input.name]=input.value;
        } 
        else {
           
            nextButton.disabled =true

        }

} 
else {

        nextButton.disabled = false
        
        QuetionNom[input.name] = input.id;
        console.log(QuetionNom);
    }

   
}

//--------controle Button précédent-----:


function control(){

    if (QuestionIndex===0){

        buttPrevious.style.visibility='hidden'

    }else{

        buttPrevious.style.visibility='visible'

    }

}


//------------ajouter Button terminé


function finTest(){

    if(QuestionIndex===21){

        nextButton.innerText = 'Terminer le test'
        sectionQuestion.innerHTML.style.fontSize="xx-large"
        sectionQuestion.innerHTML.style.width="300px"
        window.location.reload();


        

}else{

    nextButton.innerText = 'Suivant';
}

}

//------Résultat-------------------//



var counter = 0; 


function comptQuetion(){

    if(QuetionNom['q1']==='oui'){

        counter++
    }

    if(parseFloat(QuetionNom['q2'] >39) || parseFloat(QuetionNom['q2'] <35)){

        counter++
    }


    if(QuetionNom['q3']==='oui' ){

        counter++

    }

    if(QuetionNom['q10']==='Fatigué(e)' || QuetionNom['q10']=== 'Très fatigué' ){

        counter++
    }

    if(parseFloat(QuetionNom['q12'] >120) || parseFloat(QuetionNom['q12'] < 40)){

        counter++
    }

    if(QuetionNom['q16']!=='Non'){

        counter++
    }
 
    showResult(counter)
   
}
















function showResult(counter){
    alert("afficher resulta");

    saaf[1].classList.remove('actuel');
    saaf[2].classList.add('actuel');
    sectionQuestion.classList.add('hide');
    informationSection.classList.remove('hide');
    testButton.classList.remove('hide');
    testButton.innerText='Recommoncer le test';
    title.innerHTML="resultat";
    testButton.addEventListener('click',()=>{

        window.location.reload();
    })

    if (counter === 0) {
        resultMessage[0].innerText =
            "Votre situation ne relève probablement pas du Covid-19. N’hésitez pas à contacter votre médecin en cas de doute. Vous pouvez refaire le test en cas de nouveau symptôme pour réévaluer la situation. Pour toute information concernant le Covid-19, consulter la page Conseils";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026534";
    } else if (counter === 1) {
        resultMessage[0].innerText =
            "Nous vous conseillons de rester à votre domicile et de contacter votre médecin en cas d’apparition de nouveaux symptômes. Vous pourrez aussi utiliser à nouveau l’application pour réévaluer vos symptômes";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#026534";
    } else if (counter === 2) {
        resultMessage[0].innerText =
            "Vous pouvez faire une téléconsultation ou médecin généraliste ou visite à domicile. Appelez le 141 si une gêne respiratoire ou des difficultés importantes pour s’alimenter ou boire pendant plus de 24h apparaissent.";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
        resultMessage[0].style.fontSize = "25px";
        resultMessage[0].style.fontWeight = "bold";
        resultMessage[0].style.color = "#787878";
    } else {
        resultMessage[0].innerText = "Appelez le 141";
        resultMessage[1].innerText =
            "Restez chez vous au maximum en attendant que les symptômes disparaissent. Prenez votre température deux fois par jour. Rappel des mesures d’hygiène.";
    
        resultMessage[0].style.color = "#d63031";
        resultMessage[0].style.fontSize = "28px";
        resultMessage[0].style.fontWeight = "bolder";
    }
}










//------------------------------les questions --------------------------:

const questions = [{
    question: 'Pensez-vous avoir ou avoir eu de la fièvre ces 10 derniers jours (frissons, sueurs) ?',

    input: {
        type: 'radio',
        Numéro:"q1",
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        
    }]
}
}, {
    question: 'Quelle est votre température corporelle ?',

    input: {
        type: 'number',
        Numéro:"q2",
        
        name: 'degrés',
        min: 34,
        max: 42
        
    }
}, {
    question: 'Ces derniers jours, avez-vous une toux ou une augmentation de votre toux habituelle ?',

    input: {
        type: 'radio',
        Numéro:"q3",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question:'Avez-vous eu des courbatures inhabituelles au cours des derniers jours ?',

    input: {
        type: 'radio',
        Numéro:"q4",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous un mal de gorge ?',

    input: {
        type: 'radio',
        Numéro:"q5",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces dernières 24 heures, avez-vous de la diarrhée ? Avec au moins 3 selles molles.',

    input: {
        type: 'radio',
        Numéro:"q6",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Ces derniers jours, avez-vous une fatigue inhabituelle qui vous a obligé à vous reposer plus de la moitié de la journée ?',

    input: {
        type: 'radio',
        Numéro:"q7",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Avez-vous des difficultés importantes pour vous alimenter ou boire depuis plus de 24h ?',

    input: {
        type: 'radio',
        Numéro:"q8",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Dans les dernières 24 heures, avez-vous noté un manque de souffle inhabituel lorsque vous parlez ou faites un petit effort ?',

    input: {
        type: 'radio',
        Numéro:"q9",

        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, {
    question: 'Actuellement, comment vous vous sentez ?',

    input: {
        type: 'radio',
        Numéro:"q10",

        answer: [{
            text: 'Bien',
            icon: ' far fa-laugh'
        }, {
            text: 'Assez bien',
            icon: ' far fa-smile'
        }, {
            text: 'Fatigué(e)',
            icon: ' far fa-frown'
        }, {
            text: 'Très fatigué',
            icon: 'far fa-dizzy'
        }]
    }
}, {
    question: 'Quel est votre âge ? Ceci, afin de calculer un facteur de risque spécifique.',

    input: {
        Numéro:"q11",

        type: 'number',
        name: 'ans',
        min: 15,
        max: 110
    }
}, 

{
    question: 'Quel est votre poids ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        Numéro:"q12",

        type: 'number',
        name: 'kg',
        min: 20,
        max: 250
    }
}, 

{
    question: 'Quelle est votre taille ? Afin de calculer l’indice de masse corporelle qui est un facteur influençant le risque de complications de l’infection.',

    input: {
        Numéro:"q13",

        type: 'number',
        name: 'cm',
        min: 80,
        max: 250
    }
},

{
    question: 'Avez-vous de l’hypertension artérielle mal équilibrée ? Ou avez-vous une maladie cardiaque ou vasculaire ? Ou prenez-vous un traitement à visée cardiologique ?',

    input: {
        Numéro:"q14",
        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Êtes-vous diabétique ?',

    input: {
        Numéro:"q15",
        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous ou avez-vous eu un cancer ?',

    input: {
        Numéro:"q16",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie respiratoire ? Ou êtes-vous suivi par un pneumologue ?',

    input: {
        Numéro:"q17",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
},

{
    question: 'Avez-vous une insuffisance rénale chronique dialysée ?',

    input: {
        Numéro:"q18",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 

{
    question: 'Avez-vous une maladie chronique du foie ?',

    input: {
        Numéro:"q19",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Êtes-vous enceinte ?',

    input: {
        Numéro:"q20",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }, {
            text: 'Homme',
            icon: 'fa-male'

        }]
    }
},
 {
    question: 'Avez-vous une maladie connue pour diminuer vos défenses immunitaires ?',

    input: {
        Numéro:"q21",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}, 
{
    question: 'Prenez-vous un traitement immunosuppresseur ? C’est un traitement qui diminue vos défenses contre les infections. Voici quelques exemples : corticoïdes, méthotrexate, ciclosporine, tacrolimus, azathioprine, cyclophosphamide (liste non exhaustive).',

    input: {
        Numéro:"q22",

        type: 'radio',
        answer: [{
            text: 'Oui',
            icon: 'fa-check'
        }, {
            text: 'Non',
            icon: 'fa-times'
        }]
    }
}

]


