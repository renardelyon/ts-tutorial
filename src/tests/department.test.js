/* eslint-disable no-unused-expressions */
import { AccountingDepartment, ITDepartement, Departement } from '../department';

describe('Department class', () => {
  let accounting;
  let informationTech;
  beforeAll(() => {
    accounting = new AccountingDepartment('dy1n9l19h7');
    informationTech = ITDepartement.getInstance('ndaofeubf', ['djoko', 'susilo']);
  });

  it('checked static method', () => {
    expect(Departement.newYear(2)).toStrictEqual(2023);
  });

  it('checked return value of IT describe method', () => {
    expect(informationTech.describe()).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        admins: expect.arrayContaining(['djoko'])
      })
    );
  });

  it('checked return value of accounting describe method', () => {
    expect(accounting.describe()).toEqual(expect.objectContaining({
      name: expect.stringMatching(/Accounting/i),
      id: expect.stringMatching(/dy1n9l19h7/i)
    }));
  });

  it('Add array of employee', () => {
    accounting.addEmployee(['mark', 'djoko']);
    expect(accounting.employeeInformation).toEqual(expect.arrayContaining(['mark', 'djoko']));
  });

  it('Add one employee', () => {
    accounting.addEmployee('setiawan');
    expect(accounting.employeeInformation).toEqual(expect.arrayContaining(['setiawan']));
  });

  it('Get empty reports', () => {
    expect(() => {
      accounting.mostRecentReports;
    }).toThrowError(/Report not found!/i);
  });

  it('Add array of reports', () => {
    accounting.addReports(['rough', 'soft']);
    expect(accounting.returnReports).toEqual(expect.arrayContaining(['rough', 'soft']));
  });

  it('Add on reports', () => {
    accounting.addReports('abomination');
    expect(accounting.returnReports).toEqual(expect.arrayContaining(['abomination']));
  });

  it('change most recent reprots change', () => {
    accounting.mostRecentReports = 'test';
    expect(accounting.returnReports).toEqual(expect.arrayContaining(['test']));
  });

  it('pass empty string to most recent reports', () => {
    expect(() => {
      accounting.mostRecentReports = '';
    }).toThrowError(/passed/i);
  });
});
