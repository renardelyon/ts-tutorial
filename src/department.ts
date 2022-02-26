class Departement {
    private employees: string[]

    constructor(
        private readonly id: string,
        public name: string,
    ) {
        this.employees = [];
    }

    describe(this: Departement) {
        return {
            name: this.name,
            id: this.id
        };
    }

    addEmployee(this: Departement, name: string | string[]) {
        if (!(name instanceof Array)){
            this.employees.push(name);
        }  else{
            this.employees = [
                ...this.employees,
                ...name
            ]
        }     
    }

    employeeInformation(this: Departement) {
        return this.employees;
    }

}

class ITDepartement extends Departement {
    constructor(id: string, public admins: string[]){
        super(id, 'IT')
    }
}

class AccountingDepartment extends Departement {
    reports: string[];
    lastReport: string;

    get mostRecentReports() {
        if (this.lastReport) {
            return this.lastReport
        }
        throw new Error('Report not found!')
    }

    set mostRecentReports(value: string) {
        if (value) {
            throw new Error('Passed valid value')
        }
        this.addReports(value);
    }

    constructor(id: string){
        super(id, 'Accounting')
        this.reports = []
        this.lastReport = this.reports[0]
    }

    addReports(this: AccountingDepartment, newReports: string | string[]) {
        if (!(newReports instanceof Array)){
            this.reports.push(newReports);
        }  else{
            this.reports = [
                ...this.reports,
                ...newReports
            ]
        }     
    }

    returnReports(this: AccountingDepartment) {
        return this.reports
    }
}

export {
    AccountingDepartment,
    ITDepartement
}


