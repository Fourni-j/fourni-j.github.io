(function () {
    "use strict";

    const planner = window.TeleworkPlanner;
    const preferenceStorageKey = "telework-planner.preferences.v1";
    const overrideStoragePrefix = "telework-planner.day-overrides.v2.";
    const legacyLeaveStoragePrefix = "telework-planner.leave.v1.";
    const defaultPreferences = { 1: 2, 2: 2, 3: 2, 4: 5, 5: 5 };
    const preferenceLabels = {
        1: "Bureau souhaité",
        2: "Plutôt bureau",
        3: "Indifférent",
        4: "Plutôt télétravail",
        5: "Télétravail souhaité"
    };
    const monthFormatter = new Intl.DateTimeFormat("fr-FR", { month: "long", year: "numeric", timeZone: "UTC" });
    const longDateFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" });
    const shortDateFormatter = new Intl.DateTimeFormat("fr-FR", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
    const numberFormatter = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });

    const elements = {
        monthPicker: document.getElementById("month-picker"),
        previousMonth: document.getElementById("previous-month"),
        nextMonth: document.getElementById("next-month"),
        resetPreferences: document.getElementById("reset-preferences"),
        clearOverrides: document.getElementById("clear-overrides"),
        remoteSummaryCard: document.getElementById("remote-summary-card"),
        calendarTitle: document.getElementById("calendar-title"),
        calendarGrid: document.getElementById("calendar-grid"),
        calendarStatus: document.getElementById("calendar-status"),
        remoteDays: document.getElementById("remote-days"),
        remoteRate: document.getElementById("remote-rate"),
        workedDays: document.getElementById("worked-days"),
        leaveDays: document.getElementById("leave-days"),
        holidayDays: document.getElementById("holiday-days"),
        calculationExplanation: document.getElementById("calculation-explanation"),
        resultSummary: document.getElementById("result-summary"),
        remoteDateList: document.getElementById("remote-date-list"),
        copyPlanning: document.getElementById("copy-planning")
    };

    let preferences = loadPreferences();
    let currentPlanning = null;
    let currentOverrides = {};

    function currentMonthValue() {
        const now = new Date();
        return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    }

    function safeLocalStorageGet(key) {
        try {
            return window.localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function safeLocalStorageSet(key, value) {
        try {
            window.localStorage.setItem(key, value);
        } catch (error) {
            // The planner still works when storage is unavailable.
        }
    }

    function loadPreferences() {
        const storedValue = safeLocalStorageGet(preferenceStorageKey);
        if (!storedValue) {
            return { ...defaultPreferences };
        }

        try {
            const parsed = JSON.parse(storedValue);
            return { ...defaultPreferences, ...parsed };
        } catch (error) {
            return { ...defaultPreferences };
        }
    }

    function overrideStorageKey() {
        return `${overrideStoragePrefix}${elements.monthPicker.value}`;
    }

    function loadDayOverrides() {
        const storedValue = safeLocalStorageGet(overrideStorageKey());
        if (storedValue) {
            try {
                const parsed = JSON.parse(storedValue);
                return Object.fromEntries(Object.entries(parsed).filter(([, value]) => value === "remote" || value === "leave"));
            } catch (error) {
                return {};
            }
        }

        const legacyValue = safeLocalStorageGet(`${legacyLeaveStoragePrefix}${elements.monthPicker.value}`);
        if (!legacyValue) return {};

        try {
            const migrated = Object.fromEntries(JSON.parse(legacyValue).map((date) => [date, "leave"]));
            saveDayOverrides(migrated);
            return migrated;
        } catch (error) {
            return {};
        }
    }

    function saveDayOverrides(overrides) {
        safeLocalStorageSet(overrideStorageKey(), JSON.stringify(overrides));
    }

    function datesForOverride(overrides, type) {
        return Object.entries(overrides)
            .filter(([, value]) => value === type)
            .map(([date]) => date)
            .sort();
    }

    function partsFromMonthPicker() {
        const [year, month] = elements.monthPicker.value.split("-").map(Number);
        return { year, monthIndex: month - 1 };
    }

    function updatePreferenceControls() {
        document.querySelectorAll(".preference-slider").forEach((slider) => {
            const weekday = Number(slider.dataset.weekday);
            const value = Number(preferences[weekday]);
            slider.value = value;
            document.getElementById(`preference-label-${weekday}`).textContent = preferenceLabels[value];
            slider.setAttribute("aria-label", `${slider.closest(".preference-row").querySelector("strong").textContent} : ${preferenceLabels[value]}`);
        });
    }

    function moveMonth(offset) {
        const { year, monthIndex } = partsFromMonthPicker();
        const target = new Date(Date.UTC(year, monthIndex + offset, 1));
        elements.monthPicker.value = `${target.getUTCFullYear()}-${String(target.getUTCMonth() + 1).padStart(2, "0")}`;
        render();
    }

    function visibleCalendarDates(year, monthIndex) {
        const first = new Date(Date.UTC(year, monthIndex, 1));
        const last = new Date(Date.UTC(year, monthIndex + 1, 0));
        let firstWeekday = first;
        let lastWeekday = last;

        if (first.getUTCDay() === 6) firstWeekday = planner.addDays(first, 2);
        if (first.getUTCDay() === 0) firstWeekday = planner.addDays(first, 1);
        if (last.getUTCDay() === 6) lastWeekday = planner.addDays(last, -1);
        if (last.getUTCDay() === 0) lastWeekday = planner.addDays(last, -2);

        const start = planner.mondayOfWeek(firstWeekday);
        const end = planner.addDays(planner.mondayOfWeek(lastWeekday), 4);
        const dates = [];

        for (let date = start; date <= end; date = planner.addDays(date, 1)) {
            const weekday = date.getUTCDay();
            if (weekday >= 1 && weekday <= 5) {
                dates.push(date);
            }
        }

        return dates;
    }

    function statusForDate(isoDate, holidayName, leaveSet, forcedRemoteSet, remoteSet) {
        if (holidayName) return { className: "is-holiday", label: holidayName };
        if (leaveSet.has(isoDate)) return { className: "is-leave", label: "Congé" };
        if (forcedRemoteSet.has(isoDate)) return { className: "is-forced-remote", label: "Télétravail choisi" };
        if (remoteSet.has(isoDate)) return { className: "is-remote", label: "Télétravail" };
        return { className: "is-office", label: "Bureau" };
    }

    function renderCalendar(year, monthIndex, planning) {
        const fragment = document.createDocumentFragment();
        const leaveSet = new Set(planning.leaveDates);
        const forcedRemoteSet = new Set(planning.forcedRemoteDates);
        const remoteSet = new Set(planning.remoteDates);
        const today = new Date();
        const todayISO = planner.isoFromParts(today.getFullYear(), today.getMonth() + 1, today.getDate());

        elements.calendarGrid.replaceChildren();

        visibleCalendarDates(year, monthIndex).forEach((date) => {
            if (date.getUTCMonth() !== monthIndex) {
                const placeholder = document.createElement("div");
                placeholder.className = "day-placeholder";
                placeholder.setAttribute("aria-hidden", "true");
                fragment.appendChild(placeholder);
                return;
            }

            const isoDate = planner.toISO(date);
            const holidayName = planning.holidays[isoDate];
            const status = statusForDate(isoDate, holidayName, leaveSet, forcedRemoteSet, remoteSet);
            const button = document.createElement("button");
            const dateLabel = longDateFormatter.format(date);

            button.type = "button";
            button.className = `day-card ${status.className}${isoDate === todayISO ? " is-today" : ""}`;
            button.dataset.date = isoDate;
            button.setAttribute("role", "gridcell");
            button.setAttribute("aria-label", `${dateLabel}, ${status.label}`);
            button.setAttribute("aria-pressed", leaveSet.has(isoDate) ? "true" : "false");
            if (holidayName) button.disabled = true;

            const dayNumber = document.createElement("span");
            dayNumber.className = "day-number";
            dayNumber.textContent = String(date.getUTCDate());

            const dayStatus = document.createElement("span");
            dayStatus.className = "day-status";
            dayStatus.textContent = status.label;

            button.append(dayNumber, dayStatus);
            fragment.appendChild(button);
        });

        elements.calendarGrid.appendChild(fragment);
    }

    function renderSummary(planning) {
        elements.remoteDays.textContent = planning.remoteDays;
        elements.remoteRate.textContent = planning.overQuota
            ? `${numberFormatter.format(planning.remoteRate)} % : maximum dépassé`
            : `${numberFormatter.format(planning.remoteRate)} % du temps travaillé`;
        elements.remoteSummaryCard.classList.toggle("is-over-limit", planning.overQuota);
        elements.workedDays.textContent = planning.workDays;
        elements.leaveDays.textContent = planning.leaveDays;
        elements.holidayDays.textContent = planning.holidayDays;

        const halfDayReason = planning.workDays % 2 === 1
            ? ` Le jour restant ne peut pas être divisé, le taux atteint donc ${numberFormatter.format(planning.remoteRate)} %.`
            : "";
        const quotaWarning = planning.overQuota
            ? ` Tes ${planning.forcedRemoteDays} jours choisis dépassent le maximum autorisé de ${planning.maximumRemoteDays}.`
            : "";
        elements.calculationExplanation.textContent = `${planning.monthWeekdays} jours du lundi au vendredi, moins ${planning.holidayDays} férié${planning.holidayDays > 1 ? "s" : ""} et ${planning.leaveDays} congé${planning.leaveDays > 1 ? "s" : ""} : ${planning.workDays} jours travaillés.${halfDayReason}${quotaWarning}`;
    }

    function renderResults(year, monthIndex, planning) {
        const fragment = document.createDocumentFragment();
        const monthName = monthFormatter.format(new Date(Date.UTC(year, monthIndex, 1)));

        elements.remoteDateList.replaceChildren();
        elements.resultSummary.textContent = planning.overQuota
            ? `${planning.remoteDays} jours sur ${planning.workDays} en ${monthName}, soit ${numberFormatter.format(planning.remoteRate)} %. Retire au moins ${planning.remoteDays - planning.maximumRemoteDays} jour${planning.remoteDays - planning.maximumRemoteDays > 1 ? "s" : ""} choisi${planning.remoteDays - planning.maximumRemoteDays > 1 ? "s" : ""} pour respecter la limite.`
            : planning.remoteDays > 0
            ? `${planning.remoteDays} jours sur ${planning.workDays} en ${monthName}, soit ${numberFormatter.format(planning.remoteRate)} %. Les jours choisis sont prioritaires, puis les préférences complètent le planning.`
            : `Aucun jour de télétravail ne peut être proposé pour ${monthName} avec les réglages actuels.`;

        if (planning.remoteDates.length === 0) {
            const empty = document.createElement("li");
            empty.className = "empty-result";
            empty.textContent = "Aucune date à afficher";
            fragment.appendChild(empty);
        } else {
            planning.remoteDates.forEach((isoDate) => {
                const item = document.createElement("li");
                item.textContent = shortDateFormatter.format(planner.dateFromISO(isoDate));
                fragment.appendChild(item);
            });
        }

        elements.remoteDateList.appendChild(fragment);
    }

    function render() {
        const { year, monthIndex } = partsFromMonthPicker();
        currentOverrides = loadDayOverrides();
        currentPlanning = planner.calculatePlanning({
            year,
            month: monthIndex,
            leaveDates: datesForOverride(currentOverrides, "leave"),
            forcedRemoteDates: datesForOverride(currentOverrides, "remote"),
            preferences
        });

        const monthName = monthFormatter.format(new Date(Date.UTC(year, monthIndex, 1)));
        elements.calendarTitle.textContent = monthName.charAt(0).toUpperCase() + monthName.slice(1);
        renderSummary(currentPlanning);
        renderCalendar(year, monthIndex, currentPlanning);
        renderResults(year, monthIndex, currentPlanning);
    }

    async function copyPlanning() {
        const { year, monthIndex } = partsFromMonthPicker();
        const monthName = monthFormatter.format(new Date(Date.UTC(year, monthIndex, 1)));
        const lines = [
            `Planning télétravail - ${monthName}`,
            `${currentPlanning.remoteDays} jours sur ${currentPlanning.workDays} (${numberFormatter.format(currentPlanning.remoteRate)} %)`,
            ...(currentPlanning.overQuota ? [`Attention : maximum de ${currentPlanning.maximumRemoteDays} jours dépassé.`] : []),
            "",
            ...currentPlanning.remoteDates.map((isoDate) => `• ${longDateFormatter.format(planner.dateFromISO(isoDate))}`)
        ];

        try {
            await navigator.clipboard.writeText(lines.join("\n"));
            elements.copyPlanning.querySelector("span").textContent = "Planning copié";
        } catch (error) {
            const textarea = document.createElement("textarea");
            textarea.value = lines.join("\n");
            textarea.style.position = "fixed";
            textarea.style.opacity = "0";
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            textarea.remove();
            elements.copyPlanning.querySelector("span").textContent = "Planning copié";
        }

        window.setTimeout(() => {
            elements.copyPlanning.querySelector("span").textContent = "Copier le planning";
        }, 1800);
    }

    elements.monthPicker.value = currentMonthValue();
    updatePreferenceControls();

    elements.previousMonth.addEventListener("click", () => moveMonth(-1));
    elements.nextMonth.addEventListener("click", () => moveMonth(1));
    elements.monthPicker.addEventListener("change", render);

    document.querySelectorAll(".preference-slider").forEach((slider) => {
        slider.addEventListener("input", () => {
            const weekday = Number(slider.dataset.weekday);
            preferences[weekday] = Number(slider.value);
            safeLocalStorageSet(preferenceStorageKey, JSON.stringify(preferences));
            updatePreferenceControls();
            render();
        });
    });

    elements.resetPreferences.addEventListener("click", () => {
        preferences = { ...defaultPreferences };
        safeLocalStorageSet(preferenceStorageKey, JSON.stringify(preferences));
        updatePreferenceControls();
        render();
    });

    elements.calendarGrid.addEventListener("click", (event) => {
        const button = event.target.closest(".day-card");
        if (!button || button.disabled) return;

        const currentState = currentOverrides[button.dataset.date];
        if (!currentState) {
            currentOverrides[button.dataset.date] = "remote";
            elements.calendarStatus.textContent = `${button.dataset.date} choisi en télétravail.`;
        } else if (currentState === "remote") {
            currentOverrides[button.dataset.date] = "leave";
            elements.calendarStatus.textContent = `${button.dataset.date} défini comme congé.`;
        } else {
            delete currentOverrides[button.dataset.date];
            elements.calendarStatus.textContent = `${button.dataset.date} rendu à la planification automatique.`;
        }
        saveDayOverrides(currentOverrides);
        render();
    });

    elements.clearOverrides.addEventListener("click", () => {
        saveDayOverrides({});
        elements.calendarStatus.textContent = "Tous les choix manuels du mois ont été effacés.";
        render();
    });

    elements.copyPlanning.addEventListener("click", copyPlanning);

    render();
}());
