/* function stringLeght(string, maxLeght) {
  return string.length <= maxLeght;
}

function isPalindrome(string) {
  const normalString = string.toLowerCase().replace(/[^a-zа-я0-9]/g, "");
  const reversedString = normalString.split("").reverse().join("")
  return reversedString === normalString;

}

function extractNumber(string){
  const newString = String(string).match(/\d/g);
  if (!newString) return NaN;
  return parseInt(newString.join(''), 10);
}

console.log(stringLeght('абвгд', 20));
console.log(stringLeght('123456789123456', 18));
console.log(stringLeght('абвгдеёжзиклмно', 10));

console.log(isPalindrome('топот'));
console.log(isPalindrome('ДовОд'));
console.log(isPalindrome('Кекс'));
console.log(isPalindrome('Лёша на полке клопа нашёл '));

console.log(extractNumber('2023 год'));
console.log(extractNumber('ECMAScript 2022'));
console.log(extractNumber('1 кефир, 0.5 батона'));
console.log(extractNumber('агент 007'));
console.log(extractNumber('а я томат'));

console.log(extractNumber(2023));
console.log(extractNumber(-1));
console.log(extractNumber(1.5));
*/

const checkMeetingsAndWorkTime = (StartDay, EndDay, MeetingStart, MeetingTime) => {
  if (StartDay.split(':')[0] > MeetingStart.split(':')[0]) {
    return false;
  }
  if (StartDay.split(':')[0] === MeetingStart.split(':')[0]) {
    if (StartDay.split(':')[1] > MeetingStart.split(':')[1]) {
      return false;
    }
  }
  const EndMeetingTime = {
    hour: Number(MeetingStart.split(':')[0]) + Math.floor(MeetingTime / 60),
    minute: Number(MeetingStart.split(':')[1]) + MeetingTime % 60
  };

  if (EndDay.split(':')[0] > EndMeetingTime.hour) {
    return true;
  }
  if (EndDay.split(':')[0] == EndMeetingTime.hour) {
    if (EndDay.split(':')[1] >= EndMeetingTime.minute) {
      return true;
    }
  }
  return false;
};
