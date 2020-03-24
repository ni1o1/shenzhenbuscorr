var chart6 = echarts.init(document.getElementById('main3'));
window.onresize = chart6.onresize;
$.getJSON('yq/data/TAZdata2.json', function (tazdata) {
$.get('yq/map/tazjson.json', function (tazJson) {
$.getJSON('yq/data/TAZcenter.json', function (tazcenter) {
    echarts.registerMap('taz', tazJson);
var data1 = [];
for(var j = 0; j< tazdata.data.length; j++){
	data1.push(tazdata.data[j])
}
var sankeydata ={"nodes": [
    {"name": "_1","value": ["可达性","利用一种特定的交通系统从某一给定区位到达活动地点的便利程度"]},
    {"name": "_2","value": ["可达性的评价","对交通网络可达性的度量方法"]},
		{"name": "_21","value": ["可达性的影响因素",""]},
			{"name": "_211","value": ["交通因子","交通出行方式、道路等级、道路长度、道路设计速度等"]},
			{"name": "_212","value": ["广义费用因子","出行时间、距离、运费等"]},
			{"name": "_213","value": ["住区或人口因子","住区位置、住区规模、住区中心、人口数量、人口密度等"]},
			{"name": "_214","value": ["个体因子","收入、年龄、性别、种族和民族差异等"]},
			{"name": "_215","value": ["土地利用因子","用地性质、空间位置、面积、开发强度等"]},
			{"name": "_216","value": ["设施属性因子","性质、区位、规模等"]},
		{"name": "_22","value": ["可达性的度量方法",""]},
	{"name": "_3","value": ["可达性在城市内部的应用","反映城市内部交通网络的效率以及交通网络对城市内部空间结构的影响"]},	  
		{"name": "_31","value": ["城市职住空间分离","通过就业岗位可达性，分析城市职住分离情况"]},
		{"name": "_32","value": ["城市资源布局","可达性用于评价不同群体对于特定社会服务的接近度是否公平,由此可确定缺乏社会服务设施而应该关注的区域"]},
		{"name": "_33","value": ["城市公交可达性","评估城市内部公交系统可达性，以指导公交网络规划"]},
		{"name": "_34","value": ["可达性与城市土地利用模式","研究可达性对于城市经济、商业和文化活动等用地的空间分布的影响作用"]},
	{"name": "_4","value": ["可达性在城市之间的应用","反映交通网络与城市网络之间的内在联系和作用机制"]},
		{"name": "_41","value": ["可达性与区域经济联系和发展","分析可达性对区域经济发展的影响与作用"]},
		{"name": "_42","value": ["可达性与城市群中城市关系网络","分析可达性对城市群内各城市区位和城市关系网络的影响"]}
	
   ],
   "links": [
    {"source": "_1", "target": "_2", "value": [14,""]},
	{"source": "_1", "target": "_3", "value": [12,""]},
	{"source": "_1", "target": "_4", "value": [12,""]},
	{"source": "_2", "target": "_21", "value": [6,""]},
	{"source": "_2", "target": "_22", "value": [8,""]},
	{"source": "_21", "target": "_211", "value": [1,""]},
	{"source": "_21", "target": "_212", "value": [1,""]},
	{"source": "_21", "target": "_213", "value": [1,""]},
	{"source": "_21", "target": "_214", "value": [1,""]},
	{"source": "_21", "target": "_215", "value": [1,""]},
	{"source": "_21", "target": "_216", "value": [1,""]},
	{"source": "_3", "target": "_31", "value": [3,""]},
	{"source": "_3", "target": "_32", "value": [3,""]},
	{"source": "_3", "target": "_33", "value": [3,""]},
	{"source": "_3", "target": "_34", "value": [3,""]},
	{"source": "_4", "target": "_41", "value": [6,""]},
	{"source": "_4", "target": "_42", "value": [6,""]}
   ]};
option = {
	backgroundColor: new echarts.graphic.RadialGradient(0.5, 0.5, 0.4, [{
        offset: 0,
        color: 'rgba(0,0,0,0)'
    }, {
        offset: 1,
        color: 'rgba(0,0,0,0)'
    }]),
    title: {
        left: 'center',
        top: 5,
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
	parallelAxis:
		(function (){
            var list = [];
            for (var i = 0; i <tazdata.attribute.length; i++) {
                list.push({
					dim:i,
					name:tazdata.attribute[i],
					realtime:false
				});
            }
            return list;
		})(),
	parallel: {
		left: '5%',
        top: '54%',
        bottom: '15%',
        right: 15,
		axisExpandable: true,
        axisExpandCenter: 0,
        axisExpandCount: 8,
        axisExpandWidth: 60,
        parallelAxisDefault: {
            type: 'value',
            nameLocation: 'start',
            nameGap: 20,
            nameTextStyle: {
                fontSize: 12
            },
			nameRotate:35,
			tooltip: {
                show: true
            },
			axisLine: {
                // show: false,
                lineStyle: {
                    width: 1,
					color: 'rgba(0,0,0,0.6)'
                }
            }
        },

    },
/*	
	visualMap: {
            show: true,
            type: 'piecewise',
			splitNumber:2,
            categories: [0,1],
            dimension: 0,
            inRange: {
                color:['#d94e5d','#eac736']
            },
            outOfRange: {
                color: ['#fff'] //['#d94e5d','#eac736','#50a3ba']
            },
            textStyle: {
                color: '#fff'
            },
            realtime: false,
			seriesIndex:[1,2]
    },*/
	toolbox: {
		top: '20%',
		iconStyle: {
            normal: {
                borderColor: '#000'
            }
        },
        feature: {
            brush: {
                type: ['rect', 'polygon', 'clear']
            }
        }
    },
    geo: {
        map: 'taz',
        silent: true,
        label: {
            emphasis: {
                show: false,
                areaColor: '#eee'
            }
        },
        itemStyle: {
            normal: {
                borderWidth: 0.2,
                borderColor: '#404a59'
            }
        },
		left: '5%',
        top: '8%',
        bottom: '48%',
        right: 15,
        roam: false,
        // itemStyle: {
        //     normal: {
        //         areaColor: '#323c48',
        //         borderColor: '#111'
        //     },
        //     emphasis: {
        //         areaColor: '#2a333d'
        //     }
        // }
    },
	brush: {
		geoIndex: 0,
        brushLink: [0,1,2],
        inBrush: {
			color: '#FF3030',
            opacity: 1
        },
        outOfBrush: {
            
            symbolSize: 0,
            opacity: 0.1
        }
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
		name:'TAZ',
        type: 'map',
		mapType: 'taz',
		roam:false,
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
	},
	{//地图小区形心
		name:'TAZcenter',
        type: 'scatter',
		coordinateSystem: 'geo',
        data:tazcenter,
            label: {
                normal: {
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
        itemStyle: {
            normal: {
                show: false
            },
			emphasis: {
                show: false
            }
		},
		symbolSize:0
	},
	{//平行坐标系
		name:'深圳交通小区',
		type:'parallel',
		lineStyle: {
            normal: {
                color: '#577ceb',
                width: 0.5,
                opacity: 0.6
            }
        },
		//smooth: true,
        //blendMode: 'lighter',
		data:data1
	}]
};


// myChart.setOption(option);

if (option && typeof option === "object") {
    chart6.setOption(option, true);
}
});
});
});