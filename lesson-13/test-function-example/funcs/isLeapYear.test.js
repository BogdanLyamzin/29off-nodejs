/*
1. Получает год в виде целого числа.
2. Возвращает true, если год высокосный, и false,
если нет.
3. Если произошла ошибка - возвращает ошибку с нужным
текстом.

2008 - true
2003 - false
1900 - false
2000 - true

41 - ошибка 'Year must be 42 or more'
2008.4 - ошибка 'Year must be integer'
() - 'Argument must be exist'
"2008" - 'Argument must be number'
true - 'Argument must be number'
false - 'Argument must be number'
null - 'Argument must be number'
()=>{} - 'Argument must be number'
{} - 'Argument must be number'
[] - 'Argument must be number'
*/

const isLeapYear = require("./isLeapYear");

describe("test isLeapYear function", ()=>{
    test("2008 - true", ()=>{
        const result = isLeapYear(2008);
        expect(result).toBe(true); // result === true
    });

    test("2003 - false", ()=>{
        expect(isLeapYear(2003)).toBe(false); 
    });

    it("1900 - false", ()=>{
        expect(isLeapYear(1900)).toBe(false); 
    });

    test("2000 - true", ()=>{
        expect(isLeapYear(2000)).toBe(true); 
    });

    test("41 - error 'Year must be 42 or more'", ()=>{
        expect(()=> isLeapYear(41)).toThrow('Year must be 42 or more'); 
    });

    test("2008.4 - error 'Year must be integer'", ()=>{
        expect(()=> isLeapYear(2008.4)).toThrow('Year must be integer'); 
    });
});