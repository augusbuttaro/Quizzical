import { useState, useEffect } from 'react'
import { decode } from 'html-entities';
function Question(props) {
    const questionsArr = props.data 
    questionsArr.map(slot => {console.log(slot.correct_answer)})
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    useEffect(() => {
        const shuffledQuestions = questionsArr.map(slot => {
            let possibleAnswersArr = [...slot.incorrect_answers, slot.correct_answer];
            return { ...slot, possibleAnswersArr: shuffleArray(possibleAnswersArr) };
        });
        props.setData(shuffledQuestions);
    }, []);

    const [selectedAnswers, setSelectedAnswers] = useState(Array(questionsArr.length).fill(null));

    const handleAnswerSelection = (questionIndex, answerIndex, possibleAnswersArr) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[questionIndex] = possibleAnswersArr[answerIndex];
        setSelectedAnswers(updatedSelectedAnswers);
    };

    useEffect(() => {
        console.log(selectedAnswers);
    }, [selectedAnswers]);

    const correctSelectedArr = [];

    selectedAnswers.forEach((selectedAnswer, index) => {
        const correctAnswer = questionsArr[index].correct_answer;
        if (selectedAnswer === correctAnswer) {
            correctSelectedArr.push(selectedAnswer);
        }
    });

    const createSlots = questionsArr.map((slot, questionIndex, rightAnswer) => {
        const decodedQuestion = decode(slot.question)
        const possibleAnswersArr = slot.possibleAnswersArr || [];
        const createAnswers = possibleAnswersArr.map((answer, answerIndex) =>{
            if (props.isAnswered) {
                const isSelected = selectedAnswers[questionIndex] === answer;
                const isCorrect = slot.correct_answer === answer;
                const classNames = [
                    'after-answer',
                    isCorrect ? 'successfully-selected' : '', // Add 'successfully-selected' class if the answer is correct
                    isSelected && !isCorrect ? 'wrongly-selected' : '' // Add 'wrongly-selected' class if the answer is selected but not correct
                ].filter(Boolean).join(' ');

                return (
                    <p className={classNames} key={answerIndex}>
                        {decode(answer)}
                    </p>
                );
            }else
            {
                return(<p 
                    className={`answer ${selectedAnswers[questionIndex] === answer ? 'selected' : ''}`}
                    key={answerIndex}
                    onClick={() => handleAnswerSelection(questionIndex, answerIndex, possibleAnswersArr)}
                    >{decode(answer)}</p>)
            }})

        return(
        <div className='slot' key={questionIndex}>
            <h1 className='question'>{decodedQuestion}</h1>
            <div className="answer-container">
                {createAnswers}
            </div>
        </div>)
    })
    
    if(!props.isAnswered){
    return(
        <>
            <div className='questions'>
                {createSlots}
            </div>
            <button onClick={props.handleClick} className="check-btn">Check Answers</button>

        </>
    )
    }else{
        return(
        <>
            {createSlots}
            <div class="end-game-container">
                <h1 class="end-game">You scored{correctSelectedArr.length}/5 correct Answers</h1>
                <button onClick={() => window.location.reload()} class="play-again">Play Again</button>
            </div> 
        </>
        )
    }
    
}
export default Question
