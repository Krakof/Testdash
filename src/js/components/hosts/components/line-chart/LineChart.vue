
<script>
    import { Line } from 'vue-chartjs'

    export default {
        extends: Line,
        name: "chart",
        props: ['chartData'],
        data() {
            return {
                options: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltips: {
                        enabled: false
                    },
                    maintainAspectRatio: false,
                    layout: {
                        padding: {
                            left: 30,
                            right: 30,
                            top: 30,
                            bottom: 0
                        }
                    },
                    scales: {
                        xAxes: [{
                            ticks: {
                                min: 0,
                                fontSize: 16,
                                padding: 20
                            },
                            gridLines: {
                                offsetGridLines: true
                            }
                        }],
                        yAxes: [{
                            ticks: {
                                min: 0,
                                padding: 20,
                            }
                        }]
                    },
                    plugins: {
                        datalabels: {
                            anchor: 'end',
                            align: 'end',
                            color: 'red',
                            display: true,
                            font: {
                                size: 15,
                                weight: '500'
                            }
                        }
                    },
                }
            }
        },
        watch: {
            chartData() {
                this.$data._chart.destroy()
                this.renderChart(this.chartData, this.options)
            },
            deep: true
        },
        mounted() {
            this.renderChart(this.chartData, this.options)
        }
    }
</script>

<style scoped>

</style>