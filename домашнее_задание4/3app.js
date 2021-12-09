'use strict';
/**
 * Записывает свойства в объект в зависимости от значения digitNumber
 * @param {number} digitNumber число которое прошло проверки в getDigitsOfNumber
 */
function GetDigit(digitNumber){
    const arr = digitNumber.toString().split('');
    if (arr.length == 1){
    this.units = digitNumber;
    } else if (arr.length == 2){
      this.units = +(arr[1]);
      this.dozens = +(arr[0]);
    }else if (arr.length == 3){
      this.units = +(arr[2]);
      this.dozens = +(arr[1]);
      this.hundreds = +(arr[0]);
    }
  }
/**
 * Функция принимает целое положительное число в диапазоне [0, 999]
 * @param {number} digitNumber Принимает число
 * @returns {Object} Возвращает объект с свойствами 
 */
  function getDigitsOfNumber(digitNumber){
    if (digitNumber >= 0 && digitNumber < 1000 && digitNumber % 1 == 0) {
    } else {
      console.error('Ошибка, что-то пошло не так');
      return {};
    }
    const getNumber = new GetDigit(digitNumber);
    return getNumber;
    
  }
  
  const digitNumber = parseInt(prompt('Введите число от 0 до 1000',0));
  getDigitsOfNumber(digitNumber);

  const result = getDigitsOfNumber(digitNumber);
  console.log(result.units);