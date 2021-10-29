const connection = require("./connection");

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(
            "SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name AS departments, roles.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments on roles.department_id = departments.id LEFT JOIN employees manager on manager.id = employees.manager_id;"
        );
    }

    findAllPossibleManagers(employeeId) {
        return this.connection.promise().query(
            "SELECT id, first_name, last_name FROM employees WHERE id <> ?", employeeId);
    }

    createEmployee(employee) {
        return this.connection.promise().query("INSERT INTO employees SET ?", employee);
    }

    removeEmployee(employeeId) {
        return this.connection.promise().query("DELETE FROM employees WHERE id = ?", employeeId);
    }

    updateEmployeeRole(employeeId, roleId) {
        return this.connection.promise().query("UPDATE employees SET role_id = ? WHERE id = ?", [roleId, employeeId]);
    }

    updateEmployeeManager(employeeId, managerId) {
        return this.connection.promise().query("UPDATE employees SET manager_id = ? WHERE id = ?", [managerId, employeeId]);
    }

    findAllRoles() {
        return this.connection.promise().query(
            "SELECT roles.id, roles.title, departments.name AS departments, roles.salary FROM roles LEFT JOIN departments on roles.department_id = departments.id;"
        );
    }

    createPromptModule(role) {
        return this.connection.promise().query("INSERT INTO roles SET ?", role);
    }

    removeRole(roleId) {
        return this.connection.promise().query("DELETE FROM roles WHERE id = ?", roleId);
    }

    findAllDepartments() {
        return this.connection.promise().query("SELECT departments.id, departments.name FROM departments;");
    }

    // findAllEmployeesByDepartment(departmentId) {
    //     return this.connection.promise().query("SELECT employees WHERE department_id = ?", [departmentId]);
    // }

    removeDepartment(departmentId) {
        return this.connection.promise().query("DELETE FROM departments WHERE id = ?", departmentId);
    }
}

const db = new DB(connection);

module.exports = db;