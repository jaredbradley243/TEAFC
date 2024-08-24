document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = 'AIzaSyBjgF6OQx0-GLqCpYyOpiH-PBznaFezVfM';
  const CALENDAR_ID = '325fcff7cebabe8484b1f185d357cc7b34ab60740ac74a0461adbab178e4ffa0@group.calendar.google.com';
  const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const prevMonthBtn = document.querySelector("#prevMonth");
  const nextMonthBtn = document.querySelector("#nextMonth");
  const calendarGrid = document.querySelector("#calendarGrid");
  const monthTitle = document.querySelector("#monthName");

  function Calendar(month, year, today) {
    let currentMonth = month;
    let currentYear = year;

    const daysInMonth = () =>
      new Date(currentYear, currentMonth + 1, 0).getDate();
    const daysInPrevMonth = () =>
      new Date(currentYear, currentMonth, 0).getDate();
    const firstDayNumber = () =>
      new Date(currentYear, currentMonth, 1).getDay();
    const monthName = () =>
      new Date(currentYear, currentMonth).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
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
      const numDaysNextMonth =
        totalCells - (currentMonthGridStart + numDaysCurrentMonth);

      renderMonthName();

      //fill grid with prev month's days
      for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
        const cell = document.createElement("div");
        const cellDate = document.createElement("time");
        let formattedMonth = currentMonth;
        formattedMonth =
          formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
        const dateString = `${currentYear}-${formattedMonth}-${day}`;
        cell.className =
          "relative flex items-center bg-gray-50 py-1.5 text-gray-400"; // Tailwind class for empty cells
        fragment.appendChild(cell);
        cellDate.textContent = day;
        cellDate.setAttribute("datetime", dateString);
        cellDate.className =
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
        cell.appendChild(cellDate);
      }

      //fill grid with current month's days
      for (let day = 1; day <= numDaysCurrentMonth; day++) {
        const cell = document.createElement("div");
        const cellDate = document.createElement("time");
        let formattedMonth = currentMonth + 1;
        formattedMonth =
          formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
        const dateString = `${currentYear}-${formattedMonth}-${day}`;
        cell.className =
          "relative bg-white py-1.5 flex items-center text-gray-900";
        fragment.appendChild(cell);
        cellDate.textContent = day;
        cellDate.setAttribute("datetime", dateString);
        cellDate.className =
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
        cell.appendChild(cellDate);
      }

      //fill grid with next month's days
      for (let day = 0; day < numDaysNextMonth; day++) {
        const cell = document.createElement("div");
        const cellDate = document.createElement("time");
        let formattedMonth = currentMonth + 2;
        formattedMonth =
          formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
        const dateString = `${currentYear}-${formattedMonth}-${day}`;
        cell.className =
          "relative bg-gray-50 py-1.5 flex items-center text-gray-400";
        fragment.appendChild(cell);
        cellDate.textContent = day + 1;
        cellDate.setAttribute("datetime", dateString);
        cellDate.className =
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
        cell.appendChild(cellDate);
      }

      return fragment;
    };

    const clearCalendar = () => {
      while (calendarGrid.firstChild) {
        calendarGrid.removeChild(calendarGrid.firstChild);
      }
    };

    const highlightToday = () => {
      const todaysDate = document.querySelector(`[datetime = "${today}"]`);
      if (todaysDate) {
        todaysDate.className =
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-teafc-light-orange";
      }
    };

    const updateCalendar = () => {
      clearCalendar();
      calendarGrid.appendChild(renderCurrentMonth());
      highlightToday();
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

    const fetchCalData = async(calURL) => {
      try {
        const response = await fetch(calURL);
        const calData = await response.json();
        console.log(calData.items);
        return calData.items;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    return {
      highlightToday,
      renderCurrentMonth,
      renderNextMonth,
      renderPrevMonth,
      fetchCalData
    };
  }

  // Usage
  const calendar = Calendar(
    new Date().getMonth(),
    new Date().getFullYear(),
    new Date().toLocaleDateString("en-CA"),
  );
  calendarGrid.appendChild(calendar.renderCurrentMonth());
  calendar.highlightToday();
  nextMonthBtn.addEventListener("click", calendar.renderNextMonth);
  prevMonthBtn.addEventListener("click", calendar.renderPrevMonth);
});
