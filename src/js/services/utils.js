export const getAuthorMetrics = (source, authorId) => {

    for (let item of source) {

        if (item.key === authorId) return item.metrics
    }
};

export const isObjectInArray = (array, object, key) => {
    for (let item of array) {
        if (item[key] === object[key]) return true;
    }
};

export const sortArrayOfObjects = (array, key) => {
    return array.sort((a, b) => {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
        return 0;
        }
    )
};

export const htmlEntitiesDecode = (str) => {
    const elem = document.createElement('textarea');
    elem.innerHTML = str;

    return elem.value;

};

export const formatDate = (dateStr) => {
    const date = new Date(dateStr);

    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
};

export const dayName = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const d = new Date(date);
    return days[d.getDay()];
};

export const monthName = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const d = new Date(date);
    return monthNames[d.getMonth()];
}

export const formChartConfig = (labels, data, legend, style) => {

    return {
        labels: fixSinglePoint(labels, true),
        datasets: [{
            ...style,
            label: legend,
            data: fixSinglePoint(data)
        }]
    }
};

// To center single point for Line chart
const fixSinglePoint = (data, isLabels = false) => {

    const param = isLabels ? '' : null;

    return data.length === 1 ? [param, ...data, param] : data
}

export const convertFilteredData = (object) => {
    let values = [];

    let keys = Object.keys(object)
        .sort()
        .map(item => {

            values.push(object[item]);

            return item;
        });

    return [keys, values]
}

export const filterDataByHostHelper = (data, host) => {

    const details = data
        .map(author => {
            const hasAuthorHost = findHostAtReferrerList(author.fields, host);

            if (hasAuthorHost) {

                const authorData = filterDaysByHost(author.details, host);

                return {
                    key: author.key,
                    data: authorData
                }
            }
        })
        .filter(item => item);

    return {
        host,
        details
    }
};

const filterDaysByHost = (authorDetails, host) => {
    return authorDetails
        .map(day => {
            const dateHostValue = findHostAtReferrerList(day.fields, host);

            if (dateHostValue) {

                const dayData = filterArticlesByHost(day.details, host);

                return {
                    key: day.key,
                    value: dateHostValue,
                    data: dayData
                }
            }
        })
        .filter(item => item)
};

const filterArticlesByHost = (dayDetails, host) => {
    return dayDetails
        .map(article => {

            const articleHostValue = findHostAtReferrerList(article.fields, host);

            if (articleHostValue) {
                return {
                    key: article.key,
                    value: articleHostValue,
                    title: htmlEntitiesDecode(article.fields.title)

                }
            }
        })
        .filter(item => item);
};

const findHostAtReferrerList = (fields, hostName) => {
    const hostKey = 'referrer.host';

    if (Object.keys(fields).length) {

        for (let hostObj of fields[hostKey]) {

            let hasHost = Object.values(hostObj).includes(hostName);

            if (hasHost) return hostObj.value;
        }
    }

    return false;

};