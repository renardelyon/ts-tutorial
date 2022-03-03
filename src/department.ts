/* eslint-disable prefer-destructuring */

type Describe = {
    name: string
    id: string
}
abstract class Departement {
  private employees: string[];

  static fiscalYear = 2021;

  get employeeInformation() {
    return this.employees;
  }

  constructor(
        protected readonly id: string,
        public name: string,
  ) {
    this.employees = [];
  }

  static newYear(year: number) {
    return this.fiscalYear + year;
  }

  abstract describe(this: Departement): Partial<Describe>;

  addEmployee(this: Departement, name: string | string[]) {
    if (!(name instanceof Array)) {
      this.employees.push(name);
    } else {
      this.employees = [
        ...this.employees,
        ...name
      ];
    }
  }
}

interface Admin extends Describe {
    admins: string[];
}
class ITDepartement extends Departement {
  private static instance: ITDepartement;

  private constructor(id: string, private admins: string[]) {
    super(id, 'IT');
  }

  describe(this: ITDepartement): Partial<Admin> {
    return {
      name: this.name,
      admins: this.admins,
    };
  }

  static getInstance(id: string, admins: string[]) {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new ITDepartement(id, admins);
    return this.instance;
  }
}

class AccountingDepartment extends Departement {
  private reports: string[];

  private lastReport: string;

  constructor(id: string) {
    super(id, 'Accounting');
    this.reports = [];
    this.lastReport = this.reports[0];
  }

  get returnReports() {
    return this.reports;
  }

  get mostRecentReports() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error('Report not found!');
  }

  set mostRecentReports(value: string) {
    if (!value) {
      throw new Error('Passed valid value');
    }
    this.addReports(value);
  }

  describe(this: AccountingDepartment): Describe {
    return {
      name: this.name,
      id: this.id
    };
  }

  addReports(this: AccountingDepartment, newReports: string | string[]) {
    if (!(newReports instanceof Array)) {
      this.reports.push(newReports);
    } else {
      this.reports = [
        ...this.reports,
        ...newReports
      ];
    }
  }
}

export {
  Departement,
  AccountingDepartment,
  ITDepartement
};
