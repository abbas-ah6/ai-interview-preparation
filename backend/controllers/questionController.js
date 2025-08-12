const Question = require("../models/Question");
const Session = require("../models/Session");

// @desc        add additional question to existing session
// @route       POST /api/questions/add
// @access      Private
exports.addQuestionsToSession = async (req, res) => {
    try {

        const { sessionId, questions } = req.body;

        if (!sessionId || !questions || !Array.isArray(questions)) {
            return res.status(404).json({ message: "Invalud input data.", });
        }

        const session = await Session.findById(sessionId);

        if (!session) {
            return res.status(404).json({ message: "Session not found" });
        }

        // Create new questions
        const createQuestions = await Question.insertMany(
            questions.map((q) => ({
                session: sessionId,
                question: q.question,
                answer: q.answer,

            }))
        );

        // Update session to include new questions
        session.questions.push(...createQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json({ createQuestions });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc        Pin or unpin a question
// @route       POST /api/questions/:id/pin
// @access      Private
exports.togglePinQuestion = async (req, res) => {
    try {

        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404).json({ message: "Question not found.", })
        }

        question.isPinned = !question.isPinned;

        await question.save();

        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// @desc        Update a note for a question
// @route       POST /api/questions/:id/note
// @access      Private
exports.updateQuestionNote = async (req, res) => {
    try {

        const { note } = req.body;
        const question = await Question.findById(req.params.id);

        if (!question) {
            res.status(404).json({ message: "Question not found" });
        }

        question.note = note || "";

        await question.save();

        res.status(200).json({ success: true, question });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}