# -*- coding: utf-8 -*-
"""
Created on Wed Aug 10 17:31:35 2016

@author: 71472
"""
import json
poicoordcsv = open('poicoord.csv','r',newline='',encoding='utf-8')
poicoordcsv.readline()
poidata = poicoordcsv.readlines()
data={}
for eachdata in poidata:
    poiindex = eachdata.split(',')[0]
    lon = float(eachdata.split(',')[2])
    lat = float(eachdata.split(',')[3])
    coor=[lon,lat]
    data[poiindex]=coor
json.dump(data, open('poicoord.json', 'w',encoding='utf-8'),ensure_ascii=False)

poidatacsv = open('poidata.csv','r',newline='',encoding='utf-8')
poidatacsv.readline()
poidata = poidatacsv.readlines()
data1=[]
for eachdata in poidata:
    poiindex = eachdata.split(',')[0]
    value = eachdata.split(',')[15]
    res={}
    res['poiindex']=poiindex
    if value == '':
        value = '0'
    res['value']=int(value)
    res['name'] = eachdata.split(',')[1]
    data1.append(res)

json.dump(data1, open('poidata.json', 'w',encoding='utf-8'),ensure_ascii=False)