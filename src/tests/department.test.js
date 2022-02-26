import { AccountingDepartment, ITDepartement } from '../department'

describe('Department class', () => {
    let accounting;
    beforeAll(() => {
        accounting = new AccountingDepartment('dy1n9l19h7')
    });

    it('checked return value of describe method', () => {
        expect(accounting.describe()).toEqual(expect.objectContaining({
            name: expect.stringMatching(/Accounting/i),
            id: expect.stringMatching(/dy1n9l19h7/i)
        }))
    })
})