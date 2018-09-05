
<script>
    import { HorizontalBar } from 'vue-chartjs'
    import ChartJsPluginDataLabels from 'chartjs-plugin-datalabels';
    import { formChartConfig } from '@/services/utils'

    export default {
        extends: HorizontalBar,
        components: {ChartJsPluginDataLabels},
        name: "chart",
        props:['hostsData', 'setHost'],
        data() {
            return {
                style: {
                    backgroundColor: '#12b47d57',
                    borderWidth: 1,
                }
            }
        },
        methods: {
            prepareBarChartData() {
                const legend = 'Value';
                let labels = [],
                    data = [];

                this.hostsData.forEach(item => {
                    let [a, b] = Object.values(item);

                    labels.push(a);
                    data.push(b);

                });

                return formChartConfig(labels, data, legend, this.style);
            },
        },

        mounted() {
            const data = this.prepareBarChartData();

            this.renderChart(data, {
                maintainAspectRatio: false,
                tooltips: {
                    enabled: false
                },
                layout: {
                    padding: {
                        left: 0,
                        right: 100,
                        top: 0,
                        bottom: 0
                    }
                },
                scales: {
                    xAxes: [{
                        display: false,
                        type: 'logarithmic',
                        ticks: {
                            min: 0,
                        },
                        stacked: true
                    }],
                    yAxes: [{
                        barThickness: 7,
                        ticks: {
                            min: 0,
                            fontSize: 14,
                            padding: 10
                        }
                    }]
                },
                onClick: (evt) => {
                    const yAxis = this.$data._chart.scales['y-axis-0'];
                    const x = evt.offsetX;
                    const y = evt.offsetY;

                    if (evt.type === 'click' &&
                        x <= yAxis.right && x >= yAxis.left &&
                        y <= yAxis.bottom && y >= yAxis.top) {

                        // category scale returns index
                        const index = yAxis.getValueForPixel(y);
                        const host = yAxis.ticks[index];
                        this.setHost(host);
                    }
                },
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'end',
                        color: 'red',
                        display: true,
                        font: {
                            size: 14,
                            weight: '500'
                        }
                    }
                },
            })
        }
    }
</script>

<style scoped lang="scss">
</style>