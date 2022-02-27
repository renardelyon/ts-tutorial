import {
  DataStorage, countAndDescribe, objMerge, extractAndConvert
} from '../generics';

describe('Generics', () => {
  it('merge two object', () => {
    const mergedObj = objMerge({ name: 'suka' }, { age: 12 });
    expect(mergedObj).toEqual(
      expect.objectContaining({
        name: expect.any(String),
        age: expect.any(Number)
      })
    );
  });

  it('Count and describe with 1 element', () => {
    const [element, desc] = countAndDescribe(['you']);
    expect(element).toEqual(expect.arrayContaining(['you']));
    expect(desc).toEqual(expect.stringMatching(/Got 1 element/i));
  });

  it('Count and describe with more than 1 element', () => {
    const [element, desc] = countAndDescribe('you');
    expect(element).toEqual(expect.stringContaining('you'));
    expect(desc).toEqual(expect.stringMatching(/Got [\d]* element[s|\s]/i));
  });

  it('Extract and convert', () => {
    const value = extractAndConvert({ name: 'keefe' }, 'name');
    expect(value).toEqual(expect.stringContaining('keefe'));
  });

  it('Data Storage operation', () => {
    const dataStorage = new DataStorage();
    dataStorage.addData('manny');
    expect(dataStorage.getItems().length).toBeGreaterThan(0);

    dataStorage.removeItem('manny');
    expect(dataStorage.getItems().length).toBe(0);
  });
});
