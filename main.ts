#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

class student{
    
    static counter = 1000;
    id: number;
    name: string;
    courses: string[];
    balance: number;

    constructor (name: string){

        this.id = student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 100; 
    }

    enroll_course(course: string){
        this.courses.push(course);
    }

    view_balance(){
        console.log(chalk.grey(`\nBalance for ${chalk.green(this.name)} : $${chalk.red(this.balance)}\n`));
    }

    pay_fees(amount: number){
        this.balance -= amount;
        console.log(chalk.gray(`\n$${chalk.ansi256(177)(amount)} Fees paid successfully for ${chalk.green(this.name)}`));
        console.log(chalk.gray(`\nRemaining Balance for ${chalk.green(this.name)} : $${chalk.red(this.balance)}\n`));
    }

    show_status(){
        console.log(chalk.gray(`ID: ${chalk.ansi256(201)(this.id)}`));
        console.log(chalk.gray(`Name: ${chalk.green(this.name)}`));
        console.log(chalk.gray(`Courses: ${chalk.ansi256(155)(this.courses)}`));
        console.log(chalk.gray(`Balance: $${chalk.red (this.balance)}`));

    }
}

class Student_manager{

    students: student[] = [];

    add_student(name: string){
        const student_obj = new student(name);
        this.students.push(student_obj);
        console.log(chalk.gray(`\n${chalk.green(name)} added successfully| Student ID: ${chalk.ansi256(201)(student_obj.id)}\n`)); 
    }

    enroll_student(student_id: number, course: string){
        const student = this.find_student(student_id);
        if(student){
            student.enroll_course(course);
            console.log(chalk.gray(`\nStudent ${chalk.green(student.name)} enrolled in ${chalk.ansi256(155)(course)} successfully\n`));
        }
    }

    view_balance(student_id: number){
        const student = this.find_student(student_id);
        if(student){
            student.view_balance();
        }
        else{
            console.log(chalk.red("\nStudent not found. Please enter a correct ID"));
        }
    }
    pay_fees(student_id: number, amount: number){
        const student = this.find_student(student_id);
        if(student){
            student.pay_fees(amount);
        }
        else{
            console.log(chalk.red("\nStudent not found. Please enter a correct ID"));
        }
    }
    show_status(student_id: number){
        const student = this.find_student(student_id);
        if(student){
            student.show_status();
        }
        else{
            console.log(chalk.red("\nStudent not found. Please enter a correct ID"));
        }
    }
    //method to find a student by student_id
    find_student(student_id: number){
        return this.students.find(student => student.id === student_id);
    }
}
//main function to run the program
async function main(){
    console.log(chalk.ansi256(155)("\n Welcome to Code With Mujahid Student Management System"));
    console.log(chalk.green("=".repeat(60)));

    let student_manager = new Student_manager();
    while(true){
        let choice = await inquirer.prompt([
            {
                type: "list",
                name: "choice",
                message: chalk.cyan("Select an option =>"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Balance",
                    "Pay Fees",
                    "Show Status",
                    "Exit"
                ]
            }
        ]);
        switch(choice.choice){
            case "Add Student":
                let name_input = await inquirer.prompt([
                    {
                        type: "input",
                        name: "name",
                        message: chalk.ansi256(119)("Enter the name of the student:")
                    }
                ]);
                student_manager.add_student(name_input.name);
                break;
            
            case "Enroll Student":
                let course_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.ansi256(119)("Enter the ID of the student:")
                    },
                    {
                        type: "input",
                        name: "course",
                        message: chalk.ansi256(119)("Enter the name of the course:")
                    }
                ]);
                student_manager.enroll_student(course_input.student_id, course_input.course);
                break;

            case "View Balance":
                let balance_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.ansi256(119)("Enter the ID of the student:")
                    }
                ]);
                student_manager.view_balance(balance_input.student_id);
                break;

            case "Pay Fees":
                let fees_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.ansi256(119)("Enter the ID of the student:")
                    },
                    {
                        type: "number",
                        name: "amount",
                        message: chalk.ansi256(119)("Enter the amount to pay:")
                    }
                ]);
                student_manager.pay_fees(fees_input.student_id, fees_input.amount);
                break;
            
            case "Show Status":
                let status_input = await inquirer.prompt([
                    {
                        type: "number",
                        name: "student_id",
                        message: chalk.ansi256(119)("Enter the ID of the student:")
                    }
                ]);
                student_manager.show_status(status_input.student_id);
                break;

            case "Exit":
                console.log(chalk.redBright("Exiting ...."));
                process.exit();

        }
    }
}

main();




