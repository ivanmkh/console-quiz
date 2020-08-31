const reader = require("readline-sync");

module.exports = (() => {

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    const questionsData = [
        {
            description: 'What is your name?',
            answers: [
                {
                    answer: 'Ivan',
                    isCorrect: true
                },
                {
                    answer: 'Olga',
                    isCorrect: false
                },
                {
                    answer: 'John',
                    isCorrect: false
                }
            ]
        },
        {
            description: 'Where are you live in?',
            answers: [
                {
                    answer: 'New Mexico',
                    isCorrect: false
                },
                {
                    answer: 'Toronto',
                    isCorrect: false
                },
                {
                    answer: 'Moscow',
                    isCorrect: true
                }
            ]
        }
    ];

    class Question {

        constructor(description, possibleAnswers) {
            this.description = description;
            this.possibleAnswers = possibleAnswers
        }

        ask() {
            let self = this;
            console.log(`Question: ${this.description}`);
            this.possibleAnswers.forEach((a, i) => {
                console.log(`${i+1}. ${a.answer}`);
            });
            let answer = reader.question();
            let match = self.possibleAnswers[Number(answer)-1];
            if (match && match.isCorrect) console.log(`Yes, the answer is correct!`);
            else console.log(`No, the answer is wrong!`);
        }
    }

    class Quiz {
        constructor() {
            let self = this;
            this.questions = [];
            questionsData.forEach(function (q) {
                self.questions.push(new Question(q.description, q.answers));
            });
        }

        run() {
            let quit, random;
            console.log(`Run a quiz`);
            do {
                random = getRandomInt(0, this.questions.length);
                this.questions[random].ask();    
                quit = reader.question(`Shell we quit the quiz? (Yes = 1): `);
            } while(quit != 1);
        }
    }

    return {
        Quiz
    }
})()