
export const optionsColumnChart = (categories) => ({
    chart: {
        type: 'bar',
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        foreColor: '#adb0bb',
        toolbar: {
            show: true,
        },
        height: 370,
    },
    colors: ['#4F46E5', '#22D3EE'],
    plotOptions: {
        bar: {
            horizontal: false,
            barHeight: '60%',
            columnWidth: '42%',
            borderRadius: [6],
            borderRadiusApplication: 'end',
            borderRadiusWhenStacked: 'all',
        },
    },
    stroke: {
        show: true,
        width: 5,
        lineCap: 'butt',
        colors: ['transparent'],
    },
    dataLabels: {
        enabled: false,
    },
    legend: {
        show: false,
    },
    grid: {
        borderColor: 'rgba(0,0,0,0.1)',
        strokeDashArray: 3,
        xaxis: {
            lines: {
                show: false,
            },
        },
    },
    yaxis: {
        tickAmount: 4,
    },
    xaxis: {
        categories: categories,
        axisBorder: {
            show: false,
        },
    },
    tooltip: {
        theme: 'light',
        fillSeriesColor: false,
    },
});
