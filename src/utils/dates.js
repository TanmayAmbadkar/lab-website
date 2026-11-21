const MONTH_MAP = {
    jan: 0,
    january: 0,
    feb: 1,
    february: 1,
    mar: 2,
    march: 2,
    apr: 3,
    april: 3,
    may: 4,
    jun: 5,
    june: 5,
    jul: 6,
    july: 6,
    aug: 7,
    august: 7,
    sep: 8,
    sept: 8,
    september: 8,
    oct: 9,
    october: 9,
    nov: 10,
    november: 10,
    dec: 11,
    december: 11,
};

export function isFirestoreTimestamp(value) {
    return (
        value !== null &&
        typeof value === 'object' &&
        (typeof value.toDate === 'function' ||
            (typeof value.seconds === 'number' && typeof value.nanoseconds === 'number'))
    );
}

export function toDateObject(value) {
    if (!value) return null;
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : value;
    if (isFirestoreTimestamp(value)) {
        const d =
            typeof value.toDate === 'function'
                ? value.toDate()
                : new Date(value.seconds * 1000 + Math.floor(value.nanoseconds / 1e6));
        return Number.isNaN(d.getTime()) ? null : d;
    }
    return null;
}

/**
 * Safely formats Firestore Timestamps, Date objects, or date strings into a renderable string.
 * For ISO YYYY-MM-DD strings and Firestore Timestamps, formats as "Month Year" in UTC to avoid timezone shifts.
 */
export function formatDisplayDate(value) {
    if (value === null || value === undefined) return '';
    if (typeof value === 'number') return String(value);

    const dateObj = toDateObject(value);
    if (dateObj) {
        return dateObj.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC',
        });
    }

    if (typeof value === 'string') {
        const trimmed = value.trim();
        const isoMatch = trimmed.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
        if (isoMatch) {
            const d = new Date(
                Date.UTC(Number(isoMatch[1]), Number(isoMatch[2]) - 1, isoMatch[3] ? Number(isoMatch[3]) : 1)
            );
            return d.toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
                timeZone: 'UTC',
            });
        }
        return trimmed;
    }

    return '';
}

/**
 * Converts a Firestore Timestamp, Date, or date string into YYYY-MM-DD for <input type="date">.
 */
export function toDateInputValue(value) {
    if (!value) return '';
    const dateObj = toDateObject(value);
    if (dateObj) {
        return dateObj.toISOString().split('T')[0];
    }
    if (typeof value === 'string') {
        const trimmed = value.trim();
        if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
        const ts = parseFlexibleDate(trimmed);
        if (ts) {
            return new Date(ts).toISOString().split('T')[0];
        }
    }
    return '';
}

/**
 * Cross-browser parser for Firestore Timestamps, Date objects, and strings such as
 * "August 2025", "Aug 2025", "2025-08-15", or "July 12, 2025".
 */
export function parseFlexibleDate(value) {
    if (!value) return 0;

    const dateObj = toDateObject(value);
    if (dateObj) return dateObj.getTime();

    const str = String(value).trim();
    if (!str) return 0;

    // Match "YYYY-MM" or "YYYY-MM-DD"
    const isoMatch = str.match(/^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?$/);
    if (isoMatch) {
        return Date.UTC(
            Number(isoMatch[1]),
            Number(isoMatch[2]) - 1,
            isoMatch[3] ? Number(isoMatch[3]) : 1
        );
    }

    // Try standard parsing first for full dates containing a day (e.g. "July 12, 2025", "12 August 2025")
    if (/\b\d{1,2}\b/.test(str)) {
        const parsedFull = Date.parse(str);
        if (!Number.isNaN(parsedFull)) {
            return parsedFull;
        }
    }

    // Match "Month YYYY" anywhere in the string (e.g., "August 2025", "NeurIPS, Dec 2025")
    const monthYearMatch = str.match(
        /\b(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t(?:ember)?)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\.?\s+((?:19|20)\d{2})\b/i
    );
    if (monthYearMatch) {
        const monthIndex = MONTH_MAP[monthYearMatch[1].toLowerCase()];
        const year = Number(monthYearMatch[2]);
        if (monthIndex !== undefined && !Number.isNaN(year)) {
            return Date.UTC(year, monthIndex, 1);
        }
    }

    const parsed = Date.parse(str);
    if (!Number.isNaN(parsed)) {
        return parsed;
    }

    // Fallback: extract any 4-digit year
    const yearMatches = str.match(/\b(19|20)\d{2}\b/g);
    if (yearMatches && yearMatches.length > 0) {
        return Date.UTC(Number(yearMatches[yearMatches.length - 1]), 0, 1);
    }

    return 0;
}

/**
 * Returns a numeric timestamp for sorting publications chronologically.
 * Checks `pub.date` first (Firestore Timestamp, Date, or string), then `pub.conference`, then `pub.year`.
 */
export function getPublicationTimestamp(pub) {
    if (!pub) return 0;
    const fromDate = parseFlexibleDate(pub.date);
    if (fromDate) return fromDate;

    const fromConference = parseFlexibleDate(pub.conference);
    if (fromConference) return fromConference;

    if (pub.year) {
        const yearNum = Number(pub.year);
        if (!Number.isNaN(yearNum)) {
            return Date.UTC(yearNum, 0, 1);
        }
    }

    return 0;
}

export function extractYear(pub) {
    const ts = getPublicationTimestamp(pub);
    if (ts) {
        return new Date(ts).getUTCFullYear();
    }
    return null;
}
