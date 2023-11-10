<template>
  <div class="statistics-wrapper">
    <h1 class="statistics-title">To-do statistics list</h1>
    <div class="chart-wrapper" :class="data.length <= 0 ? 'chart-null' : ''">
      <span>할 일이 없습니다.</span>
      <div v-if="data.length > 0">
        <apexchart
          width="500"
          type="line"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>
      <div class="chart"></div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import VueApexCharts from "vue3-apexcharts";
import * as d3 from "d3";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      series: [
        {
          name: "할일",
          data: [],
        },
      ],
      chartOptions: {
        chart: {
          height: 350,
          type: "line",
          dropShadow: {
            enabled: true,
            color: "#262626",
            top: -10,
            left: 7,
            blur: 5,
            opacity: 0.2,
          },
          toolbar: {
            show: false,
          },
        },
        colors: ["#77B6EA", "#545454"],
        stroke: {
          width: 3,
          curve: "smooth",
        },
        title: {
          text: "To-do line graph",
          align: "left",
        },
        grid: {
          show: false,
        },
        xaxis: {
          type: "datetime",
          categories: [],
        },
        yaxis: {
          min: 0,
          max: 10,
        },
      },
      todoList: [],
      d3Data: [],
    };
  },
  computed: {
    getTodoList() {
      return this.$store.state.dummyData.todoList;
    },
  },
  watch: {
    getTodoList: {
      handler(newValue) {
        // 값이 변경될 때, 도넛 그래프 삭제
        const svg = d3.select(".chart");
        svg.remove();

        this.todoList = newValue;
        // 그래프 다시 그리기
        this.createWeek(this.todoList);
        this.createD3ChartData(this.todoList);
        this.drawD3Chart();
      },
      deep: true,
    },
  },
  created() {},
  mounted() {
    this.createWeek(this.todoList);
    this.createD3ChartData(this.todoList);
    this.drawD3Chart();
  },
  beforeDestroy() {
    const svg = d3.select(".chart");
    svg.remove();
  },

  methods: {
    createWeek(todoList) {
      // 현재부터 일주일의 배열 생성
      const week = [...Array(7)].map((_, idx) => {
        const date = new Date();
        date.setDate(date.getDate() + idx);
        return dayjs(date.toLocaleDateString()).format("YYYY-MM-DD");
      });

      // x 축 라벨
      this.chartOptions.xaxis.categories = week;

      // 각 날짜에 맞춰 객체 생성
      const counters = week.reduce((obj, date) => ({ ...obj, [date]: 0 }), {});
      const todoList = todoList;
      // 날짜에 맞춰 count 증가
      todoList.forEach((todo) => {
        if (todo.date) {
          const todoDate = String(todo.date[0]).slice(0, 10);
          if (counters.hasOwnProperty(todoDate)) {
            counters[todoDate]++;
          }
        }
      });

      // count 별로 배열 생성
      const counterArray = week.map((date) => counters[date]);
      this.series[0].data = counterArray;
    },
    createD3ChartData(todoList) {
      const todoList = todoList;
      // 진행전, 진행중, 완료 별로 카운터 증가
      const obj = [];
      todoList.forEach((el) => {
        if (obj.hasOwnProperty(el.status)) {
          obj[el.status]++;
        } else {
          obj[el.status] = 1;
        }
      });

      // d3 데이터 변수에 할당
      const keys = Object.keys(obj);
      keys.forEach((el) => {
        this.data.push({ name: el, value: obj[el] });
      });
    },
    drawD3Chart() {
      const width = 500;
      const height = 360;
      const radius = Math.min(width, height) / 2;
      const legendRectSize = 18;
      const legendSpacing = 4;

      const color = d3.scaleOrdinal(d3.schemeCategory10);

      const svg = d3
        .select(".chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2.5 + "," + height / 2 + ")");

      const arc = d3
        .arc()
        .innerRadius(radius - 100)
        .outerRadius(radius);

      const pie = d3
        .pie()
        .value(function (d) {
          return d.value;
        })
        .sort(null);

      const path = svg
        .selectAll("path")
        .data(pie(this.data))
        .enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", function (d) {
          return color(d.data.name);
        });

      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", function (d, i) {
          const height = legendRectSize + legendSpacing;
          const offset = (height * color.domain().length) / 2;
          const horz = width / 2.5;
          const vert = i * height - offset;
          return "translate(" + horz + "," + vert + ")";
        });

      legend
        .append("rect")
        .attr("width", legendRectSize)
        .attr("height", legendRectSize)
        .style("fill", color)
        .style("stroke", color);

      legend
        .append("text")
        .attr("x", legendRectSize + legendSpacing)
        .attr("y", legendRectSize - legendSpacing)
        .text(function (d) {
          return d;
        });
    },
  },
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
