// <!-- /_includes/partials/calendar.js -->
document.addEventListener("DOMContentLoaded", function () {
  const API_KEY = "AIzaSyDYYmhCCobRl2NqkO9k_6tVVqJyqmLji-k";
  const CALENDAR_ID =
    "c_7cdf1d3926cf44f9aaac3688616392a17cc4a6c8a4d9df973a52b7bd272cb64b@group.calendar.google.com";
  const endpoint = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const unformattedDate = new Date();
  const formattedYear = unformattedDate.getFullYear();
  const formattedMonth = unformattedDate.getMonth();
  const formattedDate = unformattedDate.toLocaleDateString("en-CA");
  const oneYearAgo = new Date(formattedYear - 1, formattedMonth);
  const modifiedURL = `${endpoint}&timeMin=${encodeURIComponent(oneYearAgo.toISOString())}&singleEvents=true&orderBy=startTime`;

  const blueStar = "/assets/img/star-blue.svg";
  const orangeStar = "/assets/img/star-orange.svg";
  const greenStar = "/assets/img/star-green.svg";
  const purpleStar = "/assets/img/star-purple.svg";

  const prevMonthBtn = document.querySelector("#prevMonth");
  const nextMonthBtn = document.querySelector("#nextMonth");
  const calendarGrid = document.querySelector("#calendarGrid");
  const monthTitle = document.querySelector("#monthName");
  const eventsBox = document.querySelector("#eventsFlexBox");

  function Calendar(month, year, today) {
    let currentMonth = month;
    let currentYear = year;
    let formattedEvents = [];
    let eventData = [];

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

    const createCalendarCell = (
      day,
      formattedMonth,
      isCurrentMonth,
      rowIndex,
      colIndex,
    ) => {
      const cell = document.createElement("div");
      const cellDate = document.createElement("time");

      const formattedDay = day < 10 ? "0" + day : day;
      const dateString = `${currentYear}-${formattedMonth}-${formattedDay}`;

      cell.className = `flex flex-col gap-1 items-center justify-start py-1.5 h-16 ${
        isCurrentMonth ? "bg-white text-gray-900" : "bg-gray-50 text-gray-400"
      }`;

      cellDate.textContent = day;
      cellDate.setAttribute("datetime", dateString);
      cellDate.className =
        "mx-auto flex h-7 w-7 items-center justify-center rounded-full";

      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-rowindex", rowIndex);
      cell.setAttribute("aria-colindex", colIndex);
      cell.appendChild(cellDate);
      return cell;
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

      let rowIndex = 1;
      let colIndex = 1;

      const labelCell = () => {
        colIndex++;
        if (colIndex > 7) {
          colIndex = 1;
          rowIndex++;
        }
      };

      for (let day = prevMonthGridStart; day <= numDaysPrevMonth; day++) {
        const formattedMonth =
          currentMonth < 10 ? "0" + currentMonth : currentMonth;
        fragment.appendChild(
          createCalendarCell(day, formattedMonth, false, rowIndex, colIndex),
        );
        labelCell();
      }

      for (let day = 1; day <= numDaysCurrentMonth; day++) {
        const formattedMonth =
          currentMonth + 1 < 10 ? "0" + (currentMonth + 1) : currentMonth + 1;
        fragment.appendChild(
          createCalendarCell(day, formattedMonth, true, rowIndex, colIndex),
        );
        labelCell();
      }

      for (let day = 1; day <= numDaysNextMonth; day++) {
        const formattedMonth =
          currentMonth + 2 < 10 ? "0" + (currentMonth + 2) : currentMonth + 2;
        fragment.appendChild(
          createCalendarCell(day, formattedMonth, false, rowIndex, colIndex),
        );
        labelCell();
      }

      return fragment;
    };

    const clearCalendar = () => {
      calendarGrid.innerHTML = "";
      eventsBox.innerHTML = "";
      formattedEvents = [];
    };

    const updateCalendar = () => {
      clearCalendar();
      calendarGrid.appendChild(renderCurrentMonth());
      sortCalData(eventData);
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

    const fetchCalData = async (calURL) => {
      try {
        const response = await fetch(calURL);
        if (!response.ok) {
          throw new Error("Failed to fetch events");
        }
        const calData = await response.json();
        eventData = calData.items || [];
        sortCalData(eventData);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    const createEventCell = (
      eventName,
      start,
      end,
      date,
      universalTime,
      universalDate,
    ) => {
      const cell = document.createElement("li");
      const eventDate = document.createElement("time");
      const eventTitle = document.createElement("p");
      const timeHolder = document.createElement("p");
      const eventStartTime = document.createElement("span");
      const eventEndTime = document.createElement("span");

      eventDate.textContent = date;
      if (universalTime) {
        eventDate.setAttribute("datetime", universalTime);
        eventStartTime.textContent = start;
        eventEndTime.textContent = end;
        timeHolder.append(eventStartTime, " - ", eventEndTime);
      } else if (universalDate) {
        eventDate.setAttribute("datetime", universalDate);
        eventStartTime.textContent = "All Day";
        timeHolder.append(eventStartTime);
      }
      timeHolder.className = "min-w-[10rem]";

      eventDate.className = "w-28 flex-none";

      eventTitle.textContent = eventName;
      eventTitle.className = "flex-auto font-semibold text-gray-900 max-w-48";

      cell.appendChild(eventDate);
      cell.appendChild(eventTitle);
      cell.appendChild(timeHolder);

      cell.className =
        "py-4 sm:flex gap-4 border-t-[1px] sm:border-y-0 border-gray-200";
      cell.setAttribute("role", "listitem");
      return cell;
    };

    const highlightToday = () => {
      const todaysDate = document.querySelector(`[datetime = "${today}"]`);
      if (todaysDate && todaysDate.parentNode.nodeName === "DIV") {
        todaysDate.className =
          "mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-teafc-light-orange";
      }
    };

    const imgSelector = (eventDescription) => {
      if (!eventDescription) {
        return blueStar;
      } else if (eventDescription.endsWith("~academy")) {
        return orangeStar;
      } else if (eventDescription.endsWith("~enrichment")) {
        return blueStar;
      } else if (eventDescription.endsWith("~event")) {
        return greenStar;
      } else {
        return blueStar;
      }
    };

    const imgPlacer = (events) => {
      events.forEach((event) => {
        const eventDescription = event.description;
        const timedEventStart = event.start.dateTime;
        const allDayEvent = event.start.date;
        const eventDate = timedEventStart
          ? new Date(timedEventStart).toLocaleDateString("en-CA")
          : allDayEvent;
        const eventCell = {
          name: event.summary,
          formattedTime: timedEventStart,
          dateElement: document.querySelector([`[datetime="${eventDate}"]`]),
        };

        if (eventCell.dateElement) {
          const timedEventEnd = event.end.dateTime;
          const imgElement = document.createElement("img");
          imgElement.src = imgSelector(eventDescription);
          imgElement.className = "h-5 w-5";
          imgElement.setAttribute(
            "alt",
            `Blue star indicating event on ${eventDate}`,
          );

          const startTime = timedEventStart
            ? new Date(timedEventStart).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "All Day";

          const endTime = timedEventEnd
            ? new Date(timedEventEnd).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })
            : "";

          const options = { weekday: "short", month: "short", day: "numeric" };
          const formattedEventDate = new Intl.DateTimeFormat(
            "en-US",
            options,
          ).format(new Date(eventDate + "T00:00:00"));

          eventCell.eventDescription = eventDescription;
          eventCell.eventDate = eventDate;
          eventCell.startTime = startTime;
          eventCell.endTime = endTime;
          eventCell.formattedDate = formattedEventDate;
          eventCell.formattedTime = timedEventStart;
          if (!eventCell.dateElement.nextElementSibling) {
            eventCell.dateElement.insertAdjacentElement("afterend", imgElement);
          } else {
            const nextElement = eventCell.dateElement.nextElementSibling;
            nextElement.src = purpleStar;
          }
          formattedEvents.push(eventCell);
        }
      });
    };

    const populateEvents = (events) => {
      const fragment = document.createDocumentFragment();
      events.forEach((event) => {
        const {
          endTime,
          eventDate,
          formattedDate,
          formattedTime,
          name,
          startTime,
        } = event;
        fragment.appendChild(
          createEventCell(
            name,
            startTime,
            endTime,
            formattedDate,
            formattedTime,
            eventDate,
          ),
        );
      });
      return fragment;
    };

    const sortCalData = (events) => {
      imgPlacer(events);
      eventsBox.appendChild(populateEvents(formattedEvents));
      highlightToday();
      const noEventsDiv = showNoEvents();
      if (noEventsDiv) {
        eventsBox.appendChild(noEventsDiv);
      }
    };

    const showNoEvents = () => {
      const isEventPresent = eventsBox.firstChild ? true : false;
      if (isEventPresent) {
        eventsBox.className =
          "mt-2 grid px-0.5 max-h-[28rem] grid-cols-2 flex-col gap-x-4 overflow-y-auto text-sm leading-6 text-gray-500 scrollbar-thin scrollbar-track-teafc-light-blue scrollbar-thumb-teafc-blue sm:flex sm:gap-1 sm:divide-y sm:divide-gray-200";
        return null;
      } else {
        eventsBox.className =
          "mt-2 max-h-[28rem] flex-col gap-x-4 overflow-y-auto text-sm leading-6 text-gray-500 scrollbar-thin scrollbar-track-teafc-light-blue scrollbar-thumb-teafc-blue flex gap-1";

        const cell = document.createElement("div");
        const upperText = document.createElement("p");
        const lowerText = document.createElement("p");

        upperText.textContent =
          "There are no events within the current calendar view.";
        lowerText.textContent =
          "Please change the month to explore future and past events.";

        cell.append(upperText, lowerText);

        cell.className =
          "drop-shadow-md max-w-[27rem] text-base text-gray-900 flex-1 mx-2 lg:mt-16 my-4 flex flex-col gap-px rounded-xl bg-teafc-light-orange px-5 py-7 text-center font-semibold text-black ring-4 ring-teafc-orange";
        return cell;
      }
    };

    return {
      renderCurrentMonth,
      renderNextMonth,
      renderPrevMonth,
      fetchCalData,
    };
  }

  // Usage
  if (calendarGrid) {
    const calendar = Calendar(formattedMonth, formattedYear, formattedDate);

    calendarGrid.appendChild(calendar.renderCurrentMonth());
    calendar.fetchCalData(modifiedURL);

    nextMonthBtn.addEventListener("click", calendar.renderNextMonth);
    prevMonthBtn.addEventListener("click", calendar.renderPrevMonth);
  }
});
