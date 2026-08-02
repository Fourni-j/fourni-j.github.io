(function (root, factory) {
    const planner = factory();

    if (typeof module === "object" && module.exports) {
        module.exports = planner;
    }

    root.TeleworkPlanner = planner;
}(typeof globalThis !== "undefined" ? globalThis : this, function () {
    "use strict";

    const fixedHolidays = [
        [1, 1, "Jour de l’an"],
        [5, 1, "Fête du Travail"],
        [5, 8, "Victoire 1945"],
        [7, 14, "Fête nationale"],
        [8, 15, "Assomption"],
        [11, 1, "Toussaint"],
        [11, 11, "Armistice 1918"],
        [12, 25, "Noël"]
    ];

    function pad(value) {
        return String(value).padStart(2, "0");
    }

    function isoFromParts(year, month, day) {
        return `${year}-${pad(month)}-${pad(day)}`;
    }

    function dateFromISO(isoDate) {
        const [year, month, day] = isoDate.split("-").map(Number);
        return new Date(Date.UTC(year, month - 1, day));
    }

    function toISO(date) {
        return isoFromParts(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate());
    }

    function addDays(date, count) {
        const result = new Date(date.getTime());
        result.setUTCDate(result.getUTCDate() + count);
        return result;
    }

    function easterSunday(year) {
        const a = year % 19;
        const b = Math.floor(year / 100);
        const c = year % 100;
        const d = Math.floor(b / 4);
        const e = b % 4;
        const f = Math.floor((b + 8) / 25);
        const g = Math.floor((b - f + 1) / 3);
        const h = (19 * a + b - d - g + 15) % 30;
        const i = Math.floor(c / 4);
        const k = c % 4;
        const l = (32 + 2 * e + 2 * i - h - k) % 7;
        const m = Math.floor((a + 11 * h + 22 * l) / 451);
        const month = Math.floor((h + l - 7 * m + 114) / 31);
        const day = ((h + l - 7 * m + 114) % 31) + 1;

        return new Date(Date.UTC(year, month - 1, day));
    }

    function getFrenchHolidays(year) {
        const holidays = {};

        fixedHolidays.forEach(([month, day, name]) => {
            holidays[isoFromParts(year, month, day)] = name;
        });

        const easter = easterSunday(year);
        holidays[toISO(addDays(easter, 1))] = "Lundi de Pâques";
        holidays[toISO(addDays(easter, 39))] = "Ascension";
        holidays[toISO(addDays(easter, 50))] = "Lundi de Pentecôte";

        return holidays;
    }

    function mondayOfWeek(date) {
        const day = date.getUTCDay();
        const distance = day === 0 ? -6 : 1 - day;
        return addDays(date, distance);
    }

    function monthWeekdays(year, monthIndex) {
        const dates = [];
        const lastDay = new Date(Date.UTC(year, monthIndex + 1, 0)).getUTCDate();

        for (let day = 1; day <= lastDay; day += 1) {
            const date = new Date(Date.UTC(year, monthIndex, day));
            const weekday = date.getUTCDay();
            if (weekday >= 1 && weekday <= 5) {
                dates.push(date);
            }
        }

        return dates;
    }

    function calculatePlanning(options) {
        const year = Number(options.year);
        const monthIndex = Number(options.month);
        const preferences = options.preferences || {};
        const requestedLeave = new Set(options.leaveDates || []);
        const requestedRemote = new Set(options.forcedRemoteDates || []);
        const requestedOffice = new Set(options.forcedOfficeDates || []);
        const holidays = getFrenchHolidays(year);
        const weekdays = monthWeekdays(year, monthIndex);
        const holidaysInMonth = weekdays.filter((date) => holidays[toISO(date)]);
        const validLeave = weekdays.filter((date) => {
            const isoDate = toISO(date);
            return !holidays[isoDate] && requestedLeave.has(isoDate);
        });
        const validLeaveSet = new Set(validLeave.map(toISO));
        const available = weekdays.filter((date) => {
            const isoDate = toISO(date);
            return !holidays[isoDate] && !validLeaveSet.has(isoDate);
        });
        const quota = Math.floor(available.length * 0.5);
        const selected = [];
        const selectedByWeek = {};
        const workedByWeek = {};
        const candidates = available.map((date) => {
            const weekday = date.getUTCDay();
            const week = toISO(mondayOfWeek(date));
            workedByWeek[week] = (workedByWeek[week] || 0) + 1;

            return {
                date,
                isoDate: toISO(date),
                weekday,
                week,
                preference: Number(preferences[weekday] || 3)
            };
        });
        const forcedOffice = candidates.filter((candidate) => requestedOffice.has(candidate.isoDate));
        const forcedOfficeSet = new Set(forcedOffice.map((candidate) => candidate.isoDate));
        const forcedRemote = candidates.filter((candidate) => requestedRemote.has(candidate.isoDate) && !forcedOfficeSet.has(candidate.isoDate));
        const forcedRemoteSet = new Set(forcedRemote.map((candidate) => candidate.isoDate));
        const remaining = candidates.filter((candidate) => !forcedRemoteSet.has(candidate.isoDate) && !forcedOfficeSet.has(candidate.isoDate));

        forcedRemote.forEach((candidate) => {
            selected.push(candidate);
            selectedByWeek[candidate.week] = (selectedByWeek[candidate.week] || 0) + 1;
        });

        while (selected.length < quota && remaining.length > 0) {
            const highestPreference = Math.max(...remaining.map((candidate) => candidate.preference));
            const eligible = remaining.filter((candidate) => candidate.preference === highestPreference);

            eligible.sort((left, right) => {
                const leftWeekRatio = (selectedByWeek[left.week] || 0) / workedByWeek[left.week];
                const rightWeekRatio = (selectedByWeek[right.week] || 0) / workedByWeek[right.week];

                if (leftWeekRatio !== rightWeekRatio) {
                    return leftWeekRatio - rightWeekRatio;
                }

                if (left.weekday !== right.weekday) {
                    return right.weekday - left.weekday;
                }

                return left.isoDate.localeCompare(right.isoDate);
            });

            const choice = eligible[0];
            selected.push(choice);
            selectedByWeek[choice.week] = (selectedByWeek[choice.week] || 0) + 1;
            remaining.splice(remaining.findIndex((candidate) => candidate.isoDate === choice.isoDate), 1);
        }

        const remoteDates = selected.map((candidate) => candidate.isoDate).sort();
        const forcedRemoteDates = forcedRemote.map((candidate) => candidate.isoDate).sort();
        const forcedOfficeDates = forcedOffice.map((candidate) => candidate.isoDate).sort();

        return {
            year,
            month: monthIndex,
            holidays,
            monthWeekdays: weekdays.length,
            holidayDays: holidaysInMonth.length,
            leaveDays: validLeave.length,
            leaveDates: validLeave.map(toISO).sort(),
            workDays: available.length,
            maximumRemoteDays: quota,
            remoteDays: remoteDates.length,
            remoteRate: available.length === 0 ? 0 : (remoteDates.length / available.length) * 100,
            remoteDates,
            forcedRemoteDays: forcedRemoteDates.length,
            forcedRemoteDates,
            forcedOfficeDays: forcedOfficeDates.length,
            forcedOfficeDates,
            overQuota: remoteDates.length > quota
        };
    }

    return {
        addDays,
        calculatePlanning,
        dateFromISO,
        easterSunday,
        getFrenchHolidays,
        isoFromParts,
        mondayOfWeek,
        monthWeekdays,
        toISO
    };
}));
