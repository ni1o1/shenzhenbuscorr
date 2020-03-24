# -*- coding: utf-8 -*-
"""
Created on Mon Aug 22 15:41:11 2016

@author: 71472
"""

import json
poicoordcsv = open('小区形心_wgs84.csv','r',newline='',encoding='utf-8_sig')
attribute = poicoordcsv.readline().split(',')
poidata = poicoordcsv.readlines()
res=[]
for each in poidata:
    res.append({'name':str(each.split(',')[0]),'value':[float(each.split(',')[1]),float(each.split(',')[2])]})
json.dump(res, open('TAZcenter.json', 'w',encoding='utf-8'),ensure_ascii=False)