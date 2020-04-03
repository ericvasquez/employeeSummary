
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];
const questions = [
    {
        type: 'list',
        message: 'what is your postion?',
        choices: ['Manager', 'Engineer', 'Intern'],
        name: 'role',
    },
];

const manager_questions = [
    {
        type: 'input',
        message: 'what is your name',
        name: 'name',
    },
    {
        type: 'input',
        message: 'what is your id',
        name: 'id',
    },
    {
        type: 'input',
        message: 'what is your email',
        name: 'email',
    },
    {
        type: 'input',
        message: 'what is your office number?',
        name: 'officeNumber',
    },
    {
        type: 'confirm',
        message: 'add another employee?',
        name: 'confirm'
    }
];

const engineer_questions = [
    {
        type: 'input',
        message: 'what is your name',
        name: 'name',
    },
    {
        type: 'input',
        message: 'what is your id',
        name: 'id',
    },
    {
        type: 'input',
        message: 'what is your email',
        name: 'email',
    },
    {
        type: 'input',
        message: 'what is your Github username',
        name: 'Github',
    },
    {
        type: 'confirm',
        message: 'add another employee?',
        name: 'confirm'
    }
];

const intern_questions = [
    {
        type: 'input',
        message: 'what is your name',
        name: 'name',
    },
    {
        type: 'input',
        message: 'what is your id',
        name: 'id',
    },
    {
        type: 'input',
        message: 'what is your email',
        name: 'email',
    },
    {
        type: 'input',
        message: 'What is the name of your school',
        name: 'school',
    },
    {
        type: 'confirm',
        message: 'add another employee?',
        name: 'confirm'
    }
];

function exit(employees){

    
    fs.writeFile("./output/team.html", render(employees), function(err) {
        if(err) return console.log(err);
        console.log("team.html file successfully created!");
    })

}
function init(){
inquirer.prompt(questions).then(answers => { 
 
    switch (answers.role) {
        
    case "Manager":
        inquirer.prompt(manager_questions).then(manager_answers => {
            const new_manager = new Manager(manager_answers.name, manager_answers.id, manager_answers.email, manager_answers.officeNumber)
            manager_answers['role'] = answers.role;
            employees.push(new_manager);
            console.log(manager_answers);
            
            if (manager_answers.confirm){
            init();  
            }       
            else{
            console.log("done");
            console.log(employees);
            render(employees);
            exit(employees);
            }
    }); 
        break;

    case "Intern":
        console.log("Intern");
        inquirer.prompt(intern_questions).then(intern_answers => {
            const new_intern = new Intern(intern_answers.name, intern_answers.id, intern_answers.email, intern_answers.school);
            intern_answers['role'] = answers.role;
            employees.push(new_intern);    
            console.log(intern_answers);
                    
            if (intern_answers.confirm){
            init();
            } 
            else{
            console.log("done");
            console.log(employees);
            render(employees);
            exit(employees);
            }    
    });
        break;

    case "Engineer":
    console.log("Engineer");
    inquirer.prompt(engineer_questions).then(engineer_answers => {
        const new_engineer = new Engineer(engineer_answers.name, engineer_answers.id, engineer_answers.email, engineer_answers.github);
        engineer_answers['role'] = answers.role;
        employees.push(new_engineer);    
        console.log(engineer_answers);
            if (engineer_answers.confirm){
            init()
            } 
            else {
            console.log("done");
            console.log(employees);
            render(employees);
            exit(employees);
            }
    });
        break;

        default:
            console.log("Done");
            console.log(employees);       
    }
})
};

init();
console.log(employees);
​
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
​
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
​
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
​
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
​
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an 
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work!```
