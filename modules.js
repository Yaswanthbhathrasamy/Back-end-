const readline = require("readline");
const { createStudent, readStudents, updateStudent, deleteStudent } = require("./file");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const mainMenu = () => {
    console.log("\n--- Student Management ---");
    console.log("1. Add Student");
    console.log("2. View Students");
    console.log("3. Update Student");
    console.log("4. Delete Student");
    console.log("5. Exit");
    rl.question("Choose an option: ", handleUserInput);
};

const handleUserInput = (option) => {
    switch (option) {
        case "1":
            addStudent();
            break;
        case "2":
            readStudents();
            mainMenu();
            break;
        case "3":
            rl.question("Enter student ID to update: ", (id) => {
                rl.question("Enter updated name (or leave blank): ", (name) => {
                    rl.question("Enter updated age (or leave blank): ", (age) => {
                        rl.question("Enter updated grade (or leave blank): ", (grade) => {
                            const updatedInfo = {};
                            if (name) updatedInfo.name = name;
                            if (age) updatedInfo.age = parseInt(age);
                            if (grade) updatedInfo.grade = grade;
                            updateStudent(id, updatedInfo);
                            mainMenu();
                        });
                    });
                });
            });
            break;
        case "4":
            rl.question("Enter student ID to delete: ", (id) => {
                deleteStudent(id);
                mainMenu();
            });
            break;
        case "5":
            console.log("Exiting...");
            rl.close();
            break;
        default:
            console.log("Invalid option, try again.");
            mainMenu();
            break;
    }
};

const addStudent = () => {
    rl.question("Enter student name: ", (name) => {
        rl.question("Enter student age: ", (age) => {
            rl.question("Enter student grade: ", (grade) => {
                rl.question("Enter student ID: ", (id) => {
                    createStudent({ name, age: parseInt(age), grade, id });
                    mainMenu();
                });
            });
        });
    });
};

mainMenu();
