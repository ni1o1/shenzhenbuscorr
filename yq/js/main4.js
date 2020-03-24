var chart = echarts.init(document.getElementById('main2'));
var chart2 = echarts.init(document.getElementById('sankey2'));
window.onresize = chart.onresize;
$.getJSON('yq/data/TAZdata4.json', function (tazdata) {
$.get('yq/map/tazjson.json', function (tazJson) {
$.getJSON('yq/data/TAZcenter.json', function (tazcenter) {
var fieldSelect = $(".CarType1").children("select"); 
var schema = [];
var sankeydata ={"nodes": [
//没地铁
    {"name": "_1","value": ["轨道与常规公交的接驳便捷性",""]},
		{"name": "_11","value": ["人流聚集情况",""]},
			{"name": "_111","value": ["延时指数",""]},
				{"name": "_1111","value": ["1","运营效果1:5%<br>运营效果2:80%<br>运营效果3:15%<br>运营效果4:0%"]},
				{"name": "_1112","value": ["2","运营效果1:0%<br>运营效果2:27%<br>运营效果3:55%<br>运营效果4:18%"]},
			{"name": "_112","value": ["人口密度",""]},
				{"name": "_1121","value": ["3","运营效果1:0%<br>运营效果2:13%<br>运营效果3:71%<br>运营效果4:16%"]},
				{"name": "_1122","value": ["4","运营效果1:0%<br>运营效果2:32%<br>运营效果3:32%<br>运营效果4:37%"]},
		{"name": "_12","value": ["人流聚集情况",""]},
			{"name": "_121","value": ["建成环境综合评分",""]},
				{"name": "_1211","value": ["6","运营效果1:0%<br>运营效果2:62%<br>运营效果3:25%<br>运营效果4:13%"]},
				{"name": "_1212","value": ["7","运营效果1:0%<br>运营效果2:16%<br>运营效果3:32%<br>运营效果4:53%"]},
			{"name": "_122","value": ["5","运营效果1:0%<br>运营效果2:8%<br>运营效果3:18%<br>运营效果4:74%"]},
   ],
   "links": [
    {"source": "_1", "target": "_11", "value": [4,"地铁站周围500m公交线路数<24"]},
	{"source": "_1", "target": "_12", "value": [3,"地铁站周围500m公交线路数>=24"]},
	{"source": "_11", "target": "_111", "value": [2,"微博签到数<2636"]},
	{"source": "_111", "target": "_1111", "value": [1,"延时指数<3.8"]},
	{"source": "_111", "target": "_1112", "value": [1,"延时指数>=3.8"]},
	{"source": "_11", "target": "_112", "value": [2,"微博签到数>=2636"]},
	{"source": "_112", "target": "_1121", "value": [1,"人口密度>=8942"]},
	{"source": "_112", "target": "_1122", "value": [1,"人口密度<8942"]},
	{"source": "_12", "target": "_121", "value": [2,"微博签到数<4694"]},
	{"source": "_121", "target": "_1211", "value": [1,"建成环境综合评分>=0.08"]},
	{"source": "_121", "target": "_1212", "value": [1,"建成环境综合评分<0.08"]},
	{"source": "_12", "target": "_122", "value": [1,"微博签到数>=4694"]},
   ]};
for (var i = 0; i <tazdata.attribute.length-9; i++) {
	schema.push(
		tazdata.attribute[i]
	);
}
for(var i = 0;i<schema.length;i++){ 
$("<option value='"+i+"'>" + schema[i] + "</option>").appendTo(fieldSelect); 
} 


echarts.registerMap('taz', tazJson);
var data = [];
var series = [];
var legend = [];
for (var i = 0; i<7; i++){
	data1 = []
	for(var j = 0; j<tazdata.data.length; j++){
		if(tazdata.data[j].value[tazdata.data[j].value.length-1] == i+1){

			data1.push(tazdata.data[j])
		}
	}
	data.push(data1)
	series.push(
	{//地图
		left: '8%',
        top: '30%',
        bottom: '30%',
        right: 10,
		name:String(i+1),
        type: 'map',
		mapType: 'taz',
		roam:false,
        data:data[i],
		showLegendSymbol:false,
		activeOpacity: 1,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
        itemStyle: {
            normal: {
                borderColor: '#404a59',
                color: '#577ceb',
            }
        }
	}
	)
	legend.push(String(i+1))
}
series.push(

)

var dimension = 0;
option = {
	backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: 'rgba(0,0,0,0)'
    }, {
        offset: 1,
        color: 'rgba(0,0,0,0)'
    }]),
    title: {
		text: tazdata.attribute[0],
        left: '0',
        top: '10%',
        itemGap: 0,
		textStyle: {
            color: '#000',
			fontFamily:'宋体'
        }
    },
	animation: true,
    animationDuration: 1000,
    animationEasing: 'cubicInOut',
    animationDurationUpdate: 1000,
    animationEasingUpdate: 'cubicInOut',
	legend: {
		itemGap:37,
        orient: 'vertical',
        top: 'middle',
        left: '0%',
        data:legend,
        textStyle: {
            color: '#000'
        },
		formatter:'{name}',
        selectedMode: 'single'
    },
	visualMap: {
            show: true,
            dimension: dimension,
			right: '0%',
			max:1,
			min:0,
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            outOfRange: {
                color: ['#fff'] //['#d94e5d','#eac736','#50a3ba']
            },
            textStyle: {
                color: '#000'
            },
			precision:2,
			text: ['高','低'],           // 文本，默认为数值文本
			calculable: true,
            realtime: false
    },
	tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
		formatter: function (obj) {
			var value = obj.value[1]
            return value;
        }
    },
	series:series
};
option2 = {
	backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: '#fff'
    }, {
        offset: 1,
        color: '#fff'
    }]),
	        tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
			formatter: function (obj) {
				var value = obj.value[1]
                return value;
                }

        },
	series:[{//sankey图
		left: '3%',
        top: '20%',
        bottom: '20%',
        right: '3%',
        type: 'sankey',
        layout:'none',
        data: sankeydata.nodes,
        links: sankeydata.links,
        itemStyle: {
            normal: {
                borderWidth: 1,
                borderColor: '#aaa'
            }
        },
		label:{
			normal:{
				textStyle:{
					fontSize: 20,
					color:'rgba(0,0,0,0.6)'
				},
				formatter:function (obj) {
					var value = obj.value[0]
					return value;
				}
			}
		},
        lineStyle: {
			normal: {
                color: 'source',
                curveness: 0.5
            },
			emphasis:{
				
			}
        }
	}]
}
fieldSelect.change(function (){ 
//取得当前下拉框的值 
	var dimension = $(this).val(); 
	var datamax = data1.sort(function (a, b) {return b.value[dimension] - a.value[dimension];}).slice(0, 1)[0].value[dimension];
	var datamin = data1.sort(function (a, b) {return a.value[dimension] - b.value[dimension];}).slice(0, 1)[0].value[dimension];
	if (dimension == 0){datamax = 1,datamin = 0}
//	if (dimension == 1){datamax = datamin+1500}
	if (dimension == 1){datamax = datamin+30}
	if (dimension == 2){datamax = 55,datamin = 0}
	if (dimension == 3){datamax = 10,datamin = 0}
	
	if (dimension == 4){datamax =3, datamin = 0}
	if (dimension == 5){datamax = 3,datamin = 0}
	if (dimension == 6){datamax = datamin+3}
	if (dimension == 7){datamax = 100,datamin= 0}
	if (dimension == 8){datamax = 100,datamin= 0}
	if (dimension == 9){datamax = datamin+20000}
	if (dimension == 10){datamax = datamin+2}
	if (dimension == 11){datamax = datamin+2}
	if (dimension == 12){datamax = 2*datamin}
	if (dimension == 13){datamax = 2*datamin}
	if (dimension == 14){datamax = 4,datamin = 2}
	if (dimension == 14){datamax = 20000,datamin = 0}
	chart.setOption({
		title:{text:schema[dimension]},
        visualMap: {
			range:[datamin,datamax],
			max:datamax,
			min:datamin,
            dimension:dimension
			}
	})
})

if (option && typeof option === "object") {
    chart.setOption(option, true);
	chart2.setOption(option2, true);
}
});
});
});