// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
//Import Employee class
const Employee = require('./Employee');

//Extend Employee class
class Engineer extends Employee{
    constructor(name, id, email, github){
        //use Employee properties and add github username
         super(name, id, email);
         this.github = github;
    }
    
    getGithub(){
        return this.github
    }
    //Override to return "Engineer"
    getRole(){
        return "Engineer"
    }
}

module.exports = Engineer;