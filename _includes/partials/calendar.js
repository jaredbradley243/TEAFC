document.addEventListener('DOMContentLoaded', function () {

    const prevMonthBtn = document.querySelector('#prevMonth');
    const nextMonthBtn = document.querySelector('#nextMonth');
    const calendarGrid = document.querySelector('#calendarGrid');
    const monthTitle = document.querySelector('#monthName');

    function Calendar(month, year) {
        let currentMonth = month;
        let currentYear = year;

        const daysInMonth = () => new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysInPrevMonth = () => new Date(currentYear, currentMonth, 0).getDate();
        const firstDayNumber = () => new Date(currentYear, currentMonth, 1).getDay();
        const monthName = () => new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
        const totalCells = 42;

        const renderMonthName = () => {
            monthTitle.innerText = monthName();
        };

        const renderCurrentMonth = () => {
            const fragment = document.createDocumentFragment();
            const currentMonthGridStart = (firstDayNumber() + 6) % 7;
            const lastMonthEndDay = currentMonthGridStart - 1;
            const numDaysCurrentMonth = daysInMonth();
            const numDaysPrevMonth = daysInPrevMonth();
            const prevMonthGridStart = numDaysPrevMonth - lastMonthEndDay;
            const numDaysNextMonth = totalCells - (currentMonthGridStart + numDaysCurrentMonth);

            renderMonthName();

            //fill grid with prev month's days
            for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
                const cell = document.createElement('div');
                const cellDate = document.createElement('time');
                let formattedMonth = month;
                formattedMonth = formattedMonth < 10 ? '0' + formattedMonth : formattedMonth;
                const dateString = `${year}-${formattedMonth}-${day}`;
                cell.className = 'relative bg-gray-50 py-1.5 flex items-center text-gray-400 hover:bg-gray-100 focus:z-10'; // Tailwind class for empty cells
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
                cell.className = 'relative bg-white py-1.5 flex items-center text-gray-900 hover:bg-gray-100 focus:z-10';
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
                cell.className = 'relative bg-gray-50 py-1.5 flex items-center text-gray-400 hover:bg-gray-100 focus:z-10';
                fragment.appendChild(cell);
                cellDate.textContent = day + 1;
                cellDate.setAttribute('datetime', dateString);
                cellDate.className = 'mx-auto flex h-7 w-7 items-center justify-center rounded-full';
                cell.appendChild(cellDate);
            }

            return fragment;
        };

        const clearCalendar = () => {
            while (calendarGrid.firstChild) {
                calendarGrid.removeChild(calendarGrid.firstChild);
            }
        };

        const updateCalendar = () => {
            clearCalendar();
            calendarGrid.appendChild(renderCurrentMonth());
        };

        const renderPrevMonth = () => {
            currentMonth--;
            if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            updateCalendar();
        };

        const renderNextMonth = () => {
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
            updateCalendar();
        };

        return { renderCurrentMonth, renderNextMonth, renderPrevMonth };
    }

    // Usage
    const calendar = Calendar(new Date().getMonth(), new Date().getFullYear());
    calendarGrid.appendChild(calendar.renderCurrentMonth());
    nextMonthBtn.addEventListener('click', calendar.renderNextMonth);
    prevMonthBtn.addEventListener('click', calendar.renderPrevMonth);
});