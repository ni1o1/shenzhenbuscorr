var chart5 = echarts.init(document.getElementById('main4'));
window.onresize = chart5.onresize;
$.getJSON('yq/data/TAZdata2.json', function (tazdata) {
$.get('yq/map/tazjson.json', function (tazJson) {
$.getJSON('yq/data/TAZcenter.json', function (tazcenter) {
var fieldSelect = $(".CarType").children("select"); 
var schema = [];
for (var i = 0; i <tazdata.attribute.length; i++) {
	schema.push(
		tazdata.attribute[i]
	);
}
for(var i = 0;i<schema.length;i++){ 
$("<option value='"+i+"'>" + schema[i] + "</option>").appendTo(fieldSelect); 
} 


echarts.registerMap('taz', tazJson);
var data1 = [];
for(var j = 0; j<tazdata.data.length; j++){
		data1.push(tazdata.data[j])
}

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
        left: 'center',
        top: '8%',
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
	visualMap: {
            show: true,
            dimension: dimension,
			max:data1.sort(function (a, b) {return b.value[dimension] - a.value[dimension];}).slice(0, 1)[0].value[dimension],
			min:data1.sort(function (a, b) {return a.value[dimension] - b.value[dimension];}).slice(0, 1)[0].value[dimension],
            inRange: {
                color: ['#d94e5d','#eac736','#50a3ba'].reverse()
            },
            outOfRange: {
                color: ['#fff'] //['#d94e5d','#eac736','#50a3ba']
            },
            textStyle: {
                color: '#000'
            },
			right:'3%',
			bottom: '28%',
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
	series:[
	{//地图
		left: '5%',
        top: '8%',
        bottom: '48%',
        right: 15,
		name:'有地铁',
        type: 'map',
		mapType: 'taz',
		roam:true,
        data:data1,
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
	}]
};
fieldSelect.change(function (){ 
//取得当前下拉框的值 
	var dimension = $(this).val(); 
	var datamax = data1.sort(function (a, b) {return b.value[dimension] - a.value[dimension];}).slice(0, 1)[0].value[dimension];
	var datamin = data1.sort(function (a, b) {return a.value[dimension] - b.value[dimension];}).slice(0, 1)[0].value[dimension];
	if (dimension == 1){datamax = datamin+1500}
	if (dimension == 2){datamax = datamin+30}
	if (dimension == 3){datamax = datamin+3}
	if (dimension == 5){datamax = datamin+3}
	if (dimension == 6){datamax = datamin+2}
	if (dimension == 7){datamax = datamin+2}
	if (dimension == 8){datamax = datamin+2}
	if (dimension == 9){datamax = datamin+10}
	if (dimension == 11){datamax = datamin+5}
	if (dimension == 14){datamax = datamin+1.5}
	if (dimension == 15){datamax = datamin+1.5}
	if (dimension == 16){datamax = datamin+1500}
	if (dimension == 17){datamax = datamin+6000}
	if (dimension == 18){datamax = datamin+3}
	if (dimension == 19){datamax = datamin+20000}
	chart5.setOption({
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
    chart5.setOption(option, true);
}
});
});
});