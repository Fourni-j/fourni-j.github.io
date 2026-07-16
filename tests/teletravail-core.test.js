const assert = require("node:assert/strict");
const planner = require("../assets/js/teletravail-core.js");

const officeFirstPreferences = { 1: 2, 2: 2, 3: 2, 4: 5, 5: 5 };

function plan(year, month, leaveDates = []) {
    return planner.calculatePlanning({
        year,
        month,
        leaveDates,
        preferences: officeFirstPreferences
    });
}

const holidays2026 = planner.getFrenchHolidays(2026);
assert.equal(holidays2026["2026-04-06"], "Lundi de Pâques");
assert.equal(holidays2026["2026-05-14"], "Ascension");
assert.equal(holidays2026["2026-05-25"], "Lundi de Pentecôte");

const january2026 = plan(2026, 0);
assert.equal(january2026.monthWeekdays, 22);
assert.equal(january2026.holidayDays, 1);
assert.equal(january2026.workDays, 21);
assert.equal(january2026.remoteDays, 10);
assert.ok(january2026.remoteRate < 50);
assert.ok(!january2026.remoteDates.includes("2026-01-01"));

const may2026 = plan(2026, 4, ["2026-05-04", "2026-05-05"]);
assert.equal(may2026.monthWeekdays, 21);
assert.equal(may2026.holidayDays, 4);
assert.equal(may2026.leaveDays, 2);
assert.equal(may2026.workDays, 15);
assert.equal(may2026.remoteDays, 7);
assert.ok(!may2026.remoteDates.includes("2026-05-04"));
assert.ok(!may2026.remoteDates.includes("2026-05-14"));

const september2026 = plan(2026, 8);
const preferredDates = planner.monthWeekdays(2026, 8)
    .filter((date) => date.getUTCDay() >= 4)
    .map(planner.toISO);
assert.ok(preferredDates.every((date) => september2026.remoteDates.includes(date)));
assert.equal(september2026.remoteDays, Math.floor(september2026.workDays / 2));

const invalidLeave = plan(2026, 4, ["2026-05-02", "2026-05-08"]);
assert.equal(invalidLeave.leaveDays, 0, "Weekends and public holidays do not count as leave");

console.log("Telework planner tests passed.");
