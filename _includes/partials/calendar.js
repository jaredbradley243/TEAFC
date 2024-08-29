document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = 'AIzaSyBjgF6OQx0-GLqCpYyOpiH-PBznaFezVfM';
  const CALENDAR_ID = '325fcff7cebabe8484b1f185d357cc7b34ab60740ac74a0461adbab178e4ffa0@group.calendar.google.com';
  const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const unformattedDate = new Date;
  const formattedYear = unformattedDate.getFullYear()
  const formattedMonth = unformattedDate.getMonth()
  const formattedDate = unformattedDate.toLocaleDateString("en-CA");
  const sixMonthsAgo = new Date(formattedYear, formattedMonth - 6);
  const modifiedURL = `${endpoint}&timeMin=${encodeURIComponent(sixMonthsAgo.toISOString())}&singleEvents=true`;

  const blueStar = '/assets/img/star-blue.svg';
  const orangeStar = '/assets/img/star-orange.svg';

  const prevMonthBtn = document.querySelector("#prevMonth");
  const nextMonthBtn = document.querySelector("#nextMonth");
  const calendarGrid = document.querySelector("#calendarGrid");
  const monthTitle = document.querySelector("#monthName");

  function Calendar(month, year, today) {
    let currentMonth = month;
    let currentYear = year;
    let eventData;

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

    // const renderCurrentMonth = () => {
    //   const fragment = document.createDocumentFragment();
    //   const currentMonthGridStart = (firstDayNumber() + 6) % 7;
    //   const lastMonthEndDay = currentMonthGridStart - 1;
    //   const numDaysCurrentMonth = daysInMonth();
    //   const numDaysPrevMonth = daysInPrevMonth();
    //   const prevMonthGridStart = numDaysPrevMonth - lastMonthEndDay;
    //   const numDaysNextMonth =
    //     totalCells - (currentMonthGridStart + numDaysCurrentMonth);

    //   renderMonthName();

    //   //fill grid with prev month's days
    //   for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
    //     const cell = document.createElement("div");
    //     const cellDate = document.createElement("time");
    //     let formattedMonth = currentMonth;
    //     formattedMonth =
    //       formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
    //     const formattedDay = day < 10 ? "0" + day : day;
    //     const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    //     cell.className =
    //       "relative flex flex-col gap-1 items-center justify-center bg-gray-50 py-1.5 text-gray-400";
    //     fragment.appendChild(cell);
    //     cellDate.textContent = day;
    //     cellDate.setAttribute("datetime", dateString);
    //     cellDate.className =
    //       "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
    //     cell.appendChild(cellDate);
    //   }

    //   //fill grid with current month's days
    //   for (let day = 1; day <= numDaysCurrentMonth; day++) {
    //     const cell = document.createElement("div");
    //     const cellDate = document.createElement("time");
    //     let formattedMonth = currentMonth + 1;
    //     formattedMonth =
    //       formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
    //     const formattedDay = day < 10 ? "0" + day : day;
    //     const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    //     cell.className =
    //       "relative flex flex-col gap-1 justify-center bg-white py-1.5 flex items-center text-gray-900";
    //     fragment.appendChild(cell);
    //     cellDate.textContent = day;
    //     cellDate.setAttribute("datetime", dateString);
    //     cellDate.className =
    //       "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
    //     cell.appendChild(cellDate);
    //   }

    //   //fill grid with next month's days
    //   for (let day = 1; day <= numDaysNextMonth; day++) {
    //     const cell = document.createElement("div");
    //     const cellDate = document.createElement("time");
    //     let formattedMonth = currentMonth + 2;
    //     formattedMonth =
    //       formattedMonth < 10 ? "0" + formattedMonth : formattedMonth;
    //     const formattedDay = day < 10 ? "0" + day : day;
    //     const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    //     cell.className =
    //       "relative flex flex-col gap-1 bg-gray-50 py-1.5 flex justify-center items-center text-gray-400";
    //     fragment.appendChild(cell);
    //     cellDate.textContent = day;
    //     cellDate.setAttribute("datetime", dateString);
    //     cellDate.className =
    //       "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
    //     cell.appendChild(cellDate);
    //   }

    //   return fragment;
    // };

    const renderCurrentMonth = () => {
      const fragment = document.createDocumentFragment();
      const currentMonthGridStart = (firstDayNumber() + 6) % 7;
      const lastMonthEndDay = currentMonthGridStart - 1;
      const numDaysCurrentMonth = daysInMonth();
      const numDaysPrevMonth = daysInPrevMonth();
      const prevMonthGridStart = numDaysPrevMonth - lastMonthEndDay;
      const numDaysNextMonth = totalCells - (currentMonthGridStart + numDaysCurrentMonth);
    
      renderMonthName();
    
      // Helper function to create a cell
      const createCell = (day, formattedMonth, isCurrentMonth, isNextMonth) => {
        const cell = document.createElement("div");
        const cellDate = document.createElement("time");
    
        const formattedDay = day < 10 ? "0" + day : day;
        const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;
    
        cell.className = `relative flex flex-col gap-1 items-center justify-center py-1.5 ${
          isCurrentMonth ? "bg-white text-gray-900" : "bg-gray-50 text-gray-400"
        }`;
    
        if (isNextMonth) {
          cell.classList.add("bg-gray-50", "text-gray-400");
        }
    
        cellDate.textContent = day;
        cellDate.setAttribute("datetime", dateString);
        cellDate.className = "mx-auto flex h-7 w-7 items-center justify-center rounded-full";
    
        cell.appendChild(cellDate);
        return cell;
      };
    
      // Fill grid with prev month's days
      for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
        const formattedMonth = currentMonth < 10 ? "0" + currentMonth : currentMonth;
        fragment.appendChild(createCell(day, formattedMonth, false));
      }
    
      // Fill grid with current month's days
      for (let day = 1; day <= numDaysCurrentMonth; day++) {
        const formattedMonth = currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1;
        fragment.appendChild(createCell(day, formattedMonth, true));
      }
    
      // Fill grid with next month's days
      for (let day = 1; day <= numDaysNextMonth; day++) {
        const formattedMonth = currentMonth + 2 < 10 ? "0" + (currentMonth + 2) : currentMonth + 2;
        fragment.appendChild(createCell(day, formattedMonth, false, true));
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
      sortCalData();
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
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const calData = await response.json();
        eventData = calData.items || [];
        sortCalData();
        return eventData;
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    const sortCalData = () => {
      // console.log(new Date(), 'inside');
      // console.log(eventData);
      eventData.forEach(event => {
        // console.log(event, event.summary)
        const timedEventStart = event.start.dateTime;
        const allDayEvent = event.start.date;
        const eventName = event.summary;
        const imgElement = document.createElement('img');
        imgElement.src = blueStar;
        imgElement.className = "h-5 w-5";
        let eventCell = { name: eventName };
    
        if (timedEventStart || allDayEvent) {
          const eventDate = timedEventStart ? new Date(timedEventStart).toISOString().split('T')[0] : allDayEvent;
          eventCell.dateElement = document.querySelector(`[datetime="${eventDate}"]`);
          // console.log(eventCell.dateElement);
    
        if (eventCell.dateElement && !eventCell.dateElement.nextElementSibling) {
          eventCell.dateElement.insertAdjacentElement('afterend', imgElement);
        }
        }
    
        highlightToday();
      });
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
    formattedMonth,
    formattedYear,
    formattedDate,
  );

  calendarGrid.appendChild(calendar.renderCurrentMonth());
  nextMonthBtn.addEventListener("click", calendar.renderNextMonth);
  prevMonthBtn.addEventListener("click", calendar.renderPrevMonth);
  calendar.fetchCalData(modifiedURL);
});
