// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
//Import Employee class
const Employee = require('./Employee');

class Intern extends Employee{
    constructor(name, id, email, school){
    //use Employee properties and add school
        super(name, id, email);
        this.school = school;     
    } 

    getSchool(){
        return this.school;
    }
    //Override to return "Intern"
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;


