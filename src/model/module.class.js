
export default class Module {
    constructor(code,cliteral,vliteral,courseId) {
        this.code = code;
        this.cliteral = cliteral;
        this.vliteral = vliteral;
        this.courseId = courseId;
    }

    toString(){
        return "Code: " + this.code + " Cliteral: " + this.cliteral + " Vliteral: " + this.vliteral + " CourseId: " + this.courseId;
    }



}