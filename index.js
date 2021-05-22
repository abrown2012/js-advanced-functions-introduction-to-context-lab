// Your code here
const createEmployeeRecord = (arr) => {
    let obj = {firstName: arr[0], 
            familyName: arr[1],
            title: arr[2], 
            payPerHour: arr[3], 
            timeInEvents: [],
            timeOutEvents: []
            }
    return obj
}

const createEmployeeRecords = (arr) => {
    return arr.map(x => createEmployeeRecord(x))
}

const createTimeInEvent = (employee, timestamp) => {
    let new_obj = {type: "TimeIn", 
                   date: timestamp.slice(0,10), 
                   hour: parseInt(timestamp.slice(-4))}
    employee.timeInEvents.push(new_obj)
    return employee
}
const createTimeOutEvent = (employee, timestamp) => {
    let new_obj = {type: "TimeOut", 
                   date: timestamp.slice(0,10), 
                   hour: parseInt(timestamp.slice(-4))}
    employee.timeOutEvents.push(new_obj)
    return employee
}

const hoursWorkedOnDate = (employee, dateOfEvent) => {
    let startTime = employee.timeInEvents.find(element => element.date === dateOfEvent)
    let endTime = employee.timeOutEvents.find(element => element.date === dateOfEvent )
    let hoursWorked = endTime.hour - startTime.hour
    return hoursWorked/100
}

const wagesEarnedOnDate = (employee, dateOfEvent) => {
    let wages = hoursWorkedOnDate(employee, dateOfEvent) * employee.payPerHour
    return wages
}

const allWagesFor = (employee) => {
    let allWages = employee.timeInEvents.map((timeEvent) => {
        return wagesEarnedOnDate(employee, timeEvent.date)
    })
    return allWages.reduce((x, y) => x+y)
}

const calculatePayroll = (employees) => {
    let allEmployeesPay = employees.map((employee) => {
        return allWagesFor(employee)
    })
    return allEmployeesPay.reduce((x,y)=> x+y)
}

const findEmployeeByFirstName = (allEmp, empName) => {
    let foundEmp = allEmp.find(employee => employee.firstName === empName)
    return foundEmp
}
