import requests
import os
import re
import html
import json
from bs4 import BeautifulSoup


def download(soup):
	dd = soup.find('dd')
	print(dd.text)

	image = soup.find_all('img')
	url = image[0].attrs['src']
	print(url)

	filename = re.search(r"official/(\w+)/square",url)
	namedic[dd.text] = filename.group(1)
	return
	filename = filename.group(1)+'.png'

	download_data = requests.get(url)
	content = download_data.content
	path = "/icon/"
	f = open(path+filename,"wb")
	f.write(content)
	f.close()

	url = image[1].attrs['src']
	print(url)

	filename = re.search(r"official/(\w+)/pixel",url)
	filename = filename.group(1)+'.gif'

	download_data = requests.get(url)
	content = download_data.content
	path = "/gif/"
	f = open(path+filename,"wb")
	f.write(content)
	f.close()

def downloadchara(soup):
	link = soup.find('a')
	detail = 'https://worldflipper.jp' + link.attrs['href']
	detailstr = requests.get(detail).content
	soup2 = BeautifulSoup(detailstr,"html.parser")
	cm = soup2.find('div', class_='left-content')

	images = cm.find_all('img')
	url = images[0].attrs['src']
	print(url)

	filename = re.search(r"official/(\w+)/full",url)
	filename = filename.group(1)+'_full.png'

	download_data = requests.get(url)
	content = download_data.content
	path = "full/"
	f = open(path+filename,"wb")
	f.write(content)
	f.close()

	url = images[1].attrs['src']
	print(url)
	filename = re.search(r"official/(\w+)/pixel",url)
	filename = filename.group(1)+'_special.gif'

	download_data = requests.get(url)
	content = download_data.content
	path = "gif/"
	f = open(path+filename,"wb")
	f.write(content)
	f.close()

	voice = cm.find_all('a')
	for i in range(len(voice)):
		vv = voice[i]
		uurl = vv.attrs['data-voicefile']
		print(uurl)
		filename = re.search(r"voice/(\w+/voice/.*)",uurl)
		filename = filename.group(1)
		filename = filename.replace('/voice','')
		filename = filename.replace('/','_')
		download_data = requests.get(uurl)
		content = download_data.content
		path = "voice/"
		f = open(path+filename,"wb")
		f.write(content)
		f.close()




def main():
	namedic = {}

	SERVICE_PAHT = 'https://worldflipper.jp/character/?p='

	for page in range(1,4):
		ROOT_URL = SERVICE_PAHT + str(page)

		htmlstr = requests.get(ROOT_URL).content
		#print(htmlstr)
		#soupstr = html.unescape(htmlstr)
		soup = BeautifulSoup(htmlstr,"html.parser")
		chara = soup.find_all('ul',class_='char-list')
		clist = chara[0].find_all('li')

		for i in range(len(clist)):
			download(clist[i])
			#downloadchara(clist[i])

	f = open('wf2.json','w+',encoding="utf-8")
	json.dump(namedic,f,ensure_ascii=False, indent=2)
	f.close()

def main2():
	charadic = []
	DOC_PATH = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5OvhecdUnTXEeO2fpdERfiZh3PzadSoGcpQ1IEhAPCSfcv2iLk7p0V7MFiZ7AZNnPVRSzUsRI5Wye/pubhtml#'
	htmlstr = requests.get(DOC_PATH).content
	soup = BeautifulSoup(htmlstr,"html.parser")
	table = soup.find_all('tbody')
	cdic = {}
	for i in range(len(table)-2):
		sheet = table[i]
		rows = sheet.find_all('tr')
		for j in range(len(rows)):
			tr = rows[j]
			if(j % 10==0):
				#print(cdic)
				charadic.append(cdic)
				cdic = {}
			elif(j % 10 == 1):
				cdic['info'] = tr.find_all('td')[5].text
			elif(j % 10 == 2):
				cell = tr.find_all('td')
				temp = cell[1].get_text(' ').split()
				print(temp)
				cdic['jname'] = temp[0]
				cdic['url'] = nameData[temp[0]]
				cdic['cname'] = temp[1]
				cdic['rare'] = cell[2].find('img').attrs['src']
				cdic['cv'] = cell[3].text
			elif(j % 10 == 3):
				cell = tr.find_all('td')
				cdic['job'] = cell[2].find('img').attrs['src']
				cdic['race'] = cell[4].text
			elif(j % 10 == 4):
				cell = tr.find_all('td')
				cdic['sex'] = cell[2].text
				cdic['type'] = cell[4].find('img').attrs['src']
			elif(j % 10 == 5):
				cell = tr.find_all('td')
				cdic['leader'] = cell[2].text
				cdic['leader_info'] = cell[3].text
			elif(j % 10 == 6):
				cell = tr.find_all('td')
				cdic['skill'] = cell[2].text
				cdic['skill_info'] = cell[3].text
			elif(j % 10 == 7):
				cell = tr.find_all('td')
				cdic['ability1'] = cell[2].text
			elif(j % 10 == 8):
				cell = tr.find_all('td')
				cdic['ability2'] = cell[2].text
			elif(j % 10 == 9):
				cell = tr.find_all('td')
				cdic['ability3'] = cell[2].text
	f = open('wf5.json','w+', encoding="utf8")
	json.dump(charadic,f,ensure_ascii=False, indent=2)
	f.close()

#main2()

def main3():
	equip = []
	EQUIP_PATH = 'https://gamewith.jp/worldflipper/article/show/178049'
	htmlstr = requests.get(EQUIP_PATH).content
	soup = BeautifulSoup(htmlstr,"html.parser")
	table = soup.find_all('table')
	for i in range(len(table)-1):
		sheet = table[i]
		rows = sheet.find_all('tr')
		for j in range(1,len(rows)-1):
			edic = {}
			edic['rare'] = 5-i
			cells = rows[j].find_all('td')
			
			edic['jname'] = cells[0].find('a').text

			#img
			url = cells[0].find_all('img')[1].attrs['src']
			print(url)

			filename = re.search(r"gacha/(\w+)",url)
			tt = filename.group(1)
			edic['url'] = tt
			
			#filename = tt + '.png'
			# download_data = requests.get(url)
			# content = download_data.content
			# path = "equip/"
			# f = open(path+filename,"wb")
			# f.write(content)
			# f.close()

			newurl = cells[0].find('a').attrs['href']
			print(newurl)

			htmlstr2 = requests.get(newurl).content
			soup2 = BeautifulSoup(htmlstr2,"html.parser")
			page = soup2.find('div', id='article-body')
			#table
			stable = page.find_all('table')
			for k in range(len(stable)):
				if(k==0):
					tds = stable[k].find_all('td')
					edic['type'] = tds[1].text
					edic['get'] = tds[2].text
				elif(k==1):
					tds = stable[k].find_all('td')
					edic['hp_init'] = tds[0].text
					edic['hp_max'] = tds[1].text
					edic['atk_init'] = tds[2].text
					edic['atk_max'] = tds[3].text
				elif(k==2):
					tds = stable[k].find_all('td')
					edic['effect_init'] = tds[0].text
					edic['effect_max'] = tds[1].text
				elif(k==3):
					aas = stable[k].find_all('a')
					charas = []
					for z in range(len(aas)):
						charas.append(aas[z].text)
					edic['chara'] = charas
			
			equip.append(edic)

	f = open('equip.json','w+', encoding="utf8")
	json.dump(equip,f,ensure_ascii=False, indent=2)
	f.close()

main3()