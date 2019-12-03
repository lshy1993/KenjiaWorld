import xlrd
import json

workbook = xlrd.open_workbook('wf.xlsx')
# 获取所有sheet
sheets = workbook.sheet_names()
print(sheets)
chara = []
for i in range(1,len(sheets)):
    sheet2 = workbook.sheet_by_index(i)
    row = sheet2.nrows
    col = sheet2.ncols
    crow = 0
    while(crow < row):
        chara.append({
            'color': i,
            'jname': sheet2.cell(crow,0).value,
            'cname': sheet2.cell(crow,2).value,
            'rare': sheet2.cell(crow+2,2).value,
            'race': sheet2.cell(crow+4,2).value,
            'job': sheet2.cell(crow+6,2).value,
            'cv': sheet2.cell(crow+8,2).value,
            'maxhp': sheet2.cell(crow+3,4).value,
            'maxatk': sheet2.cell(crow+7,4).value,
            'background': sheet2.cell(crow+9,4).value,
            'skill': sheet2.cell(crow+13,1).value,
            'skill_info': sheet2.cell(crow+13,4).value,
            'leader': sheet2.cell(crow+16,1).value,
            'leader_info': sheet2.cell(crow+16,4).value,
            'ability1': sheet2.cell(crow+19,1).value,
            'ability2': sheet2.cell(crow+20,1).value,
            'ability3': sheet2.cell(crow+21,1).value,
            'ability4': sheet2.cell(crow+22,1).value
        })
        crow += 25

f = open('wf.json','w+',encoding="utf-8")
json.dump(chara,f,ensure_ascii=False, indent=2)
f.close()