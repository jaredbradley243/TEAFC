const prevMonthBtn = document.querySelector('#prevMonth');
const nextMonthBtn = document.querySelector('#nextMonth')

function Calendar(month, year) {
    const daysInMonth = () => new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = () => new Date(year, month, 0).getDate();
    const firstDayNumber = () => new Date(year, month, 1).getDay();
    const firstDayNumberNormalized = (firstDayNumber() + 6) % 7;
    const totalCells = 35;


    const render = () => {
        const fragment = document.createDocumentFragment();
        const currentMonthGridStart = firstDayNumberNormalized;
        const lastMonthEndDay = currentMonthGridStart - 1;
        const numDaysCurrentMonth = daysInMonth();
        const numDaysPrevMonth = daysInPrevMonth();
        const prevMonthGridStart = numDaysPrevMonth - lastMonthEndDay;
        const numDaysNextMonth = totalCells - (currentMonthGridStart + numDaysCurrentMonth);

        //fill grid with prev month's days
        for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
            const cell = document.createElement('div');
            const cellDate = document.createElement('time');
            let formattedMonth = month;
            formattedMonth = formattedMonth < 10 ? '0' + formattedMonth : formattedMonth;
            const dateString = `${year}-${formattedMonth}-${day}`;
            cell.className = 'relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10'; // Tailwind class for empty cells
            fragment.appendChild(cell);
            cellDate.textContent = day;
            cellDate.setAttribute('datetime', dateString);
            cellDate.className = 'mx-auto flex h-7 w-7 items-center justify-center rounded-full';
            cell.appendChild(cellDate);
        }

        //fill grid with current month's days
        for (let day = 1; day <= numDaysCurrentMonth; day++) {
            const cell = document.createElement('div');
            const cellDate = document.createElement('time');
            let formattedMonth = month + 1;
            formattedMonth = formattedMonth < 10 ? '0' + formattedMonth : formattedMonth;
            const dateString = `${year}-${formattedMonth}-${day}`;
            cell.className = 'relative bg-white py-1.5 text-gray-900 hover:bg-gray-100 focus:z-10';
            fragment.appendChild(cell);
            cellDate.textContent = day;
            cellDate.setAttribute('datetime', dateString);
            cellDate.className = 'mx-auto flex h-7 w-7 items-center justify-center rounded-full';
            cell.appendChild(cellDate);
        }

        //fill grid with next month's days
        for (let day = 0; day < numDaysNextMonth; day++) {
            const cell = document.createElement('div');
            const cellDate = document.createElement('time');
            let formattedMonth = month + 2;
            formattedMonth = formattedMonth < 10 ? '0' + formattedMonth : formattedMonth;
            const dateString = `${year}-${formattedMonth}-${day}`;
            cell.className = 'relative bg-gray-50 py-1.5 text-gray-400 hover:bg-gray-100 focus:z-10';
            fragment.appendChild(cell);
            cellDate.textContent = day + 1;
            cellDate.setAttribute('datetime', dateString);
            cellDate.className = 'mx-auto flex h-7 w-7 items-center justify-center rounded-full';
            cell.appendChild(cellDate);
        }

        return fragment;
    };

    return { render };
}

// Usage
const calendar = Calendar(new Date().getMonth(), new Date().getFullYear());
document.querySelector('#calendarGrid').appendChild(calendar.render());