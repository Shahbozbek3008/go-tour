"use client";

import { useState } from "react";

export function useCalendar(initialDate?: Date) {
  const base = initialDate ?? new Date();
  const [viewMonth, setViewMonth] = useState(base.getMonth());
  const [viewYear, setViewYear] = useState(base.getFullYear());

  function goToPrev() {
    setViewMonth((m) => {
      if (m === 0) { setViewYear((y) => y - 1); return 11; }
      return m - 1;
    });
  }

  function goToNext() {
    setViewMonth((m) => {
      if (m === 11) { setViewYear((y) => y + 1); return 0; }
      return m + 1;
    });
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function getFirstDayOffset(year: number, month: number) {
    const day = new Date(year, month, 1).getDay();
    return (day + 6) % 7;
  }

  return {
    viewMonth,
    viewYear,
    goToPrev,
    goToNext,
    getDaysInMonth,
    getFirstDayOffset,
  };
}
