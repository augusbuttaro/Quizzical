import { useState, useEffect } from 'react'
import Question from './active-components/question'

function Active(props) {
    const [apiQuestions, setApiQuestions] = useState([])
    const [selectedAnswers, setSelectedAnswers] = useState([]);

    useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5&type=multiple&difficulty=easy")
          .then(res => res.json())
          .then(data => setApiQuestions(data.results))
    }, [])

    const [shuffledQuestions, setShuffledQuestions] = useState([]);

    const handleAnswerSelection = (index, answer) => {
        const updatedAnswers = [...selectedAnswers];
        updatedAnswers[index] = answer;
        setSelectedAnswers(updatedAnswers);
      };

    useEffect(() => {
        if (apiQuestions.length > 0) {
            const shuffledQuestions = apiQuestions.map(slot => {
                let possibleAnswersArr = [...slot.incorrect_answers, slot.correct_answer];
                return { ...slot, possibleAnswersArr: shuffleArray(possibleAnswersArr) };
            });
            setShuffledQuestions(shuffledQuestions);
        }
    }, [apiQuestions]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    if(props.isStarted)    
    return (
        <>
        <Question   
        handleClick={props.handleClick} 
        handleAnswerSelection={handleAnswerSelection}
        isAnswered={props.isAnswered} 
        setData={setShuffledQuestions} 
        data={shuffledQuestions}
        />
        </>       
    )
}

export default Active
