// 1. Biggest Number

function maxRedigit(number) {
  console.log(`Your Input: ${number}`);
  if (number <= 0 || number % 11 == 0 || number % 10 == 0) {
    return `Null`;
  } else {
    return String(number)
      .split("")
      .map((num) => Number(num))
      .sort((a, b) => b - a)
      .join("");
  }
}

// 2. Map Array Data

function productArray(arrNumber) {
  const n = arrNumber.length;
  const result = [];
  let prod = 1;
  for (let i = 0; i < n; i++) prod *= arrNumber[i];
  for (let i = 0; i < n; i++)
    result.push(Number(prod * Math.pow(arrNumber[i], -1) + " "));
  return result;
}

// 3. Alternate case

function alternateCase(string) {
  return string.split(" ").map((s, index) => {
    if (
      [...s]
        .map((leter, i) => {
          return /[A-Z]/.test(leter);
        })
        .filter((s) => s).length == 1
    ) {
      return s.charAt(0).toLowerCase() + s.toUpperCase().slice(1);
    } else if (/[a-z]/.test(s)) {
      return s.toUpperCase();
    } else if (/[A-Z]/.test(s)) {
      return s.toLowerCase();
    }
  });
}

// 4. Multiple 3 and 5

function solution(number) {
  let arrNumber = [];
  for (let i = 1; i < number; i++) {
    if (i % 3 == 0 || i % 5 == 0) {
      arrNumber.push(i);
    }
  }
  const count = arrNumber.join(" + ");
  const result = arrNumber.reduce((acc, curr) => acc + curr);
  console.log(`${result} = ${count}`);
}
