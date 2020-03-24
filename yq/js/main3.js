var chart3 = echarts.init(document.getElementById('main'));
var chart4 = echarts.init(document.getElementById('sankey'));
window.onresize = chart3.onresize;
$.getJSON('yq/data/TAZdata3.json', function (tazdata) {
$.get('yq/map/tazjson.json', function (tazJson) {
$.getJSON('yq/data/TAZcenter.json', function (tazcenter) {
var fieldSelect = $(".CarType2").children("select"); 
var schema = [];
var sankeydata ={"nodes": [
//没地铁
    {"name": "_1","value": ["公交可达性",""]},
		{"name": "_11","value": ["公交可达性",""]},
			{"name": "_111","value": ["1","运营效果1:74%<br>运营效果2:15%<br>运营效果3:6%<br>运营效果4:4%"]},
			{"name": "_112","value": ["2","运营效果1:27%<br>运营效果2:54%<br>运营效果3:14%<br>运营效果4:5%"]},
		{"name": "_12","value": ["人口密度",""]},
			{"name": "_121","value": ["公交站点密度",""]},
				{"name": "_1211","value": ["3","运营效果1:3%<br>运营效果2:68%<br>运营效果3:19%<br>运营效果4:11%"]},
				{"name": "_1212","value": ["4","运营效果1:18%<br>运营效果2:9%<br>运营效果3:55%<br>运营效果4:18%"]},
			{"name": "_122","value": ["人流聚集情况",""]},
				{"name": "_1221","value": ["5","运营效果1:0%<br>运营效果2:7%<br>运营效果3:72%<br>运营效果4:21%"]},
				{"name": "_1222","value": ["6","运营效果1:0%<br>运营效果2:18%<br>运营效果3:18%<br>运营效果4:64%"]},
   ],
   "links": [
    {"source": "_1", "target": "_11", "value": [2,"公交可达性（秒）>=8090"]},
	{"source": "_1", "target": "_12", "value": [4,"公交可达性（秒）<8090"]},
	{"source": "_11", "target": "_111", "value": [1,"公交可达性（秒）>=10000"]},
	{"source": "_11", "target": "_112", "value": [1,"公交可达性（秒）<10000"]},
	{"source": "_12", "target": "_121", "value": [2,"人口密度<9300"]},
	{"source": "_121", "target": "_1211", "value": [1,"公交站点密度（个/km2）>=2.9"]},
	{"source": "_121", "target": "_1212", "value": [1,"公交站点密度（个/km2）<2.9"]},
	{"source": "_12", "target": "_122", "value": [2,"人口密度>=9300"]},
	{"source": "_122", "target": "_1221", "value": [1,"微博签到数<6830"]},
	{"source": "_122", "target": "_1222", "value": [1,"微博签到数>=6830"]}
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
for (var i = 0; i<6; i++){
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
		itemGap:47,
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
	chart3.setOption({
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
    chart3.setOption(option, true);
	chart4.setOption(option2, true);
}
});
});
});