import * as statusCode from "../constants/status.constants.js";
import IsValidID from "../utils/IsValidID.js";
import ResponseError from "../utils/respErr.js";

export default (query) => {
    const { from, to, analyticsInterval } = query;
    let search = query.search || "";
    let amount = query.amount || null;
    let grouped = query.grouped || false;
    let pageNumber = query.pageNumber || 1;
    search = search.trim();
    const filter = query.filter ? query.filter.split(",") : undefined;
    filter && filter.map((f) => {
        if (!IsValidID(f)) {
            throw new ResponseError(
                "Please provide a valid filter",
                statusCode.BAD_REQUEST
            );
        }
        return f;
    });

    let startDate = null;
    let endDate = null;

    // if (!from && !to) {
    //     startDate = new Date();
    //     endDate = new Date();
    // }

    if (from) {
        startDate = new Date(from);
    }

    if (to) {
        endDate = new Date(to);
    }

    if (grouped && grouped === "true") {
        grouped = true;
    }

    if (grouped && grouped === "false") {
        grouped = false;
    }
    if (pageNumber)
        pageNumber = pageNumber - 1;

    if (amount) {
        if (isNaN(parseFloat(amount))) {
            throw new ResponseError(
                "Please provide a valid amount",
                statusCode.BAD_REQUEST
            );
        }
        amount = parseFloat(amount);
    }

    return {
        from: startDate,
        to: endDate,
        search,
        amount,
        grouped,
        filter,
        analyticsInterval,
        pageNumber
    };
};

export const getFirstDayOfCurrentMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
    // set time to 00:00:00
    firstDay.setUTCHours(0, 0, 0, 0);
    return firstDay;
};

export const getLastDayOfCurrentMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
    // set time to 23:59:59
    lastDay.setUTCHours(23, 59, 59, 999);
    return lastDay;
}; 
