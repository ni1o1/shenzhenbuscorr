# -*- coding: utf-8 -*-
"""
Created on Thu Aug 18 19:33:31 2016

@author: 71472
"""
import json
poicoordcsv = open('treeResult_Metro.csv','r',newline='',encoding='utf-8_sig')
attribute = poicoordcsv.readline()[:-2].split(',')
poidata = poicoordcsv.readlines()
data={}
list4=[]
for eachdata in poidata:
    list1={}
    list2=eachdata.split(',')
    list3=[]
    #list3.append(list2[1])
    for num in list2[1:]:
        try:
            flnum = float(num)
        except:
            flnum = 0
        list3.append(flnum)
    list1['name']=list2[0]
    list1['value']=list3
    list4.append(list1)
data['data']=list4
data['attribute']=attribute[1:]
json.dump(data, open('TAZdata4.json', 'w',encoding='utf-8'),ensure_ascii=False)