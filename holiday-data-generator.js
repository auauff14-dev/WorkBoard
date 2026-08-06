const fs = require('fs');
const Holidays = require('date-holidays');
const hd = new Holidays('JP');
const years = Array.from({ length: 30 }, (_, i) => 2026 + i);
const holidays = [];

for (const year of years) {
  const list = hd.getHolidays(year).filter((h) => h.type === 'public');
  for (const h of list) {
    const date = new Date(h.date);
    let name = h.name;

    if (name.includes('振替休日')) {
      name = '振替休日';
    } else if (name.includes('国民の休日')) {
      name = '国民の休日';
    } else if (name === '体育の日') {
      name = 'スポーツの日';
    }

    holidays.push({
      year,
      month: date.getMonth() + 1,
      day: date.getDate(),
      name
    });
  }
}

fs.writeFileSync('official-japanese-holidays.json', JSON.stringify(holidays, null, 2));
console.log('wrote official-japanese-holidays.json');
