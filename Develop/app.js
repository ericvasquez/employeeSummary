const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const employees = [];


async function askQuestions(){
    const res = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What the employee's name?"
          },
          {
            type: "input",
            name: "id",
            message: "What the employee's id?"
          },
          {
            type: "input",
            name: "email",
            message: "What the employee's email address?"
          },
          {
            type: "list",
            name: "role",
            message: "Select the employee's role?",
            choices: ["Manager", "Engineer", "Intern"]
          }
        ]);


switch (res.role) {
    case "Manager":
      const phone = await inquirer.prompt([
        {
          type: "input",
          name: "officeNumber",
          message: "What the manager's office number?"
        }
      ]);
      employees.push(
        new Manager(res.name, res.id, res.email, phone.officeNumber)
      );
      addAnotherEmployee();
      break;
    case "Engineer":
      const gitHub = await inquirer.prompt([
        {
          type: "input",
          name: "gitHubUserName",
          message: "What the engineer's github username?"
        }
      ]);
      employees.push(
        new Engineer(res.name, res.id, res.email, gitHub.gitHubUserName)
      );
      addAnotherEmployee();
      break;
    case "Intern":
      const school = await inquirer.prompt([
        {
          type: "input",
          name: "schoolName",
          message: "Which school does the intern go to?"
        }
      ]);
      employees.push(
        new Intern(res.name, res.id, res.email, school.schoolName)
      );
      addAnotherEmployee();
      break;
    default:
  }
}
askQuestions();

async function addAnotherEmployee() {
    const addMoreEmployee = await inquirer.prompt([
      {
        type: "confirm",
        name: "addAgain",
        message: "Do you want to add another employee?"
      }
    ]);
    
    addMoreEmployee.addAgain == true ? askQuestions() : buildTeam(employees);
  }
  function buildTeam(employees) {
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(employees), "utf-8");
  }