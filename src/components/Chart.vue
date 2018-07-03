<template>
  <div>
    <v-layout row mt-4>
      <v-flex xs-10 sm-10 offset-sm1 offset-xs1>
        <v-card width="90%" >
          <h2 class='title text-sm-center text-xs-center pt-2' >{{ title }}</h2>
          <section id="chart" ></section> 
          <section id="footer">
          </section>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template> 

<script>
import * as d3 from 'd3';
import data from '../assets/data.json'
import * as utility from '../utility'

export default {
  data() {
    return {
      title: 'D3 Data Visualization',
    }
  },

  mounted() {

    let barData = utility.getDataPoints(data);
    let categories = utility.getCategories(data);
    let states = utility.getStates(data);

    let margin = { top: 30, right: 30, bottom: 40, left:50 };

    let height = 600 - margin.top - margin.bottom;
    let width = 1000 - margin.left - margin.right;

    let yScale = d3.scale.linear().domain([0, d3.max(barData)]).range([0, height]);
    let xScale = d3.scale.ordinal().domain(d3.range(0, barData.length)).rangeBands([0, width], .2);

    let categoriesCounter = 0;
    let colorCounter = 0;
    let colors = utility.getColors(categories.length);

    // draw chart.
    var chart = d3.select('#chart').append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate('+ margin.left + ', ' + margin.top + ')')
      .selectAll('rect')
      .data(barData).enter()
        .append('rect')
          .style('fill', () => {
            if (colorCounter === (categories.length-1)) {
              colorCounter = 0;
              return colors[colorCounter+categories.length-1];
            }
            colorCounter +=1;
            return colors[colorCounter-1];
          })
          .attr('width', xScale.rangeBand())
          .attr('x', (data, index) => xScale(index))
          .attr('height', 0)
          .attr('y', height);

      // apply transition to chart.
      chart.transition()
        .attr('height', data => yScale(data))
        .attr('y', data => height - yScale(data))
        .delay(100)
        .duration(1000)
        .ease('elastic');


      // draw y-axis.
      var vGuideScale = d3.scale.linear().domain([0, d3.max(barData)]).range([height,0]);

      var vAxis = d3.svg.axis()
          .scale(vGuideScale)
          .orient('left')
          .ticks(10);

      var vGuide = d3.select('svg').append('g');
          vAxis(vGuide);
          vGuide.attr('transform', 'translate('+ margin.left + ', ' + margin.top + ')');
          vGuide.selectAll('path')
          .style({fill: 'none', stroke: '#000'});
          vGuide.selectAll('line')
          .style({ stroke: '#000'});

      // draw x-axis.
      var bottomScale =  d3.scale.ordinal().domain(states).rangeBands([0, width]);

      var hAxis = d3.svg.axis()
      .scale(bottomScale)
      .orient('bottom')
      .tickValues(bottomScale.domain());

      var hGuide = d3.select('svg').append('g');
          hAxis(hGuide);
          hGuide.attr('transform', 'translate('+ margin.left + ', ' + (height + margin.top) + ')');
          hGuide.selectAll('path')
            .style({fill: 'none', stroke: '#000'});
          hGuide.selectAll('line')
          .style({ stroke: '#000'});


      // draw category color in footer.
      let categoryAndColor = utility.getCategoryAndColor(categories, colors);

      d3.select('#footer').selectAll('div')
        .data(categoryAndColor)
        .enter().append('span')
        .text(data => data.category + ':')
          .append('span')
          .append('svg')
            .attr('height', 20)
            .attr('width', 20)
            .append('rect')
              .attr('height', 10)
              .attr('width', 10)
              .attr('x', 2)
              .attr('y', 10)
              .style('fill', data => data.color);
  }
}
</script>

<style scoped>

</style>

