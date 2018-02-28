mentoring.service('FormUtilService', FormUtilService);

function FormUtilService() {
    this.addQuestionsSequence = function (questions) {
        return questions.map(function(question, $index) {
            question.sequence = $index + 1;
            return question;
        });
    };

    this.createSequenceArray = function(length) {
        var sequences = [];
        for(var seq=1; seq <= length; seq++) {
            sequences.push(seq);
        }

        return sequences;
    };

    this.createQuestionSequencePayload = function(questions) {
        return questions.map(function(question) {
            return {
                sequence: question.sequence,
                question:question
            };
        });
    };

    this.sortQuestionsBySequence = function(questions) {
        return questions.sort(function(q1, q2) {
            return q1.sequence - q2.sequence;
        });
    };

    this.handleSequenceChanges = function(questionWithChanges, questions) {
        if(questionWithChanges.sequence == questionWithChanges.newSequence) return;

        if(questionWithChanges.newSequence < questionWithChanges.sequence) {
            for(var i = questionWithChanges.newSequence - 1; i < questionWithChanges.sequence - 1; i++) {
                questions[i].sequence = questions[i].newSequence = questions[i].sequence + 1;
            }
        }
        else {
            for(var j = questionWithChanges.sequence; j < questionWithChanges.newSequence; j++) {
                questions[j].sequence = questions[j].newSequence = questions[j].sequence - 1;
            }
        }

        questionWithChanges.sequence = questionWithChanges.newSequence;
    };
}
