(function () {
  var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns:html="http://www.w3.org/TR/REC-html40"><head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>sheet</x:Name><x:WorksheetOptions><x:DisplayGridlines /></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body>{htmldata}</body></html>'
  var excel_URL = 'data:application/vnd.ms-excel;base64,'
  var Exprot = {
    toExcel: function (data) {
      var isIE = window.navigator.userAgent.toLocaleLowerCase().indexOf('trident')
      if (isIE !== -1) {
        //ie
        this._IEExprot(data)
      } else {
        //其他
        this._OtherExprot(data)
      }
    },
    _IEExprot: function (data) { //ie浏览器
      //打开excel
      var oXL = new ActiveXObject('Excel.Application')
      //新建工作簿
      var oWB = oXL.Workbooks.Add()
      //激活新建的工作簿
      var oSheet = oWB.ActiveSheet

      if (typeof data === 'string') {
        var ele = document.querySelector(data)
        //创建容器
        var sel = document.body.createTextRange()
        //将数据移入到容器中
        try {
          sel.select()
        } catch (error) {
          console.log(error)
        }
        //复制容器中的内容
        sel.execCommand('Copy')
        //粘贴到excel工作簿中
        oSheet.Paste()

      } else {
        var j = 0
        for (key in data[0]) {
          oSheet.Cells(1, ++j).value = data[0][key]
        }
        for (var i = 1; i < data.length; i++) {
          j = 0
          var row = data[i]
          for (key in row) {
            if (key === 'dataTime') {
              oSheet.Cells(i + 1, ++j) == this._changeDate(row[key])
            }
            eles {
              oSheet.Cells(i + 1, ++j) == row[key]
            }
          }
        }

      }
      //设置文件名
      var filename = oXL.Application.GetSaveAsFilename('下载.xls', 'Excel Spreadsheets (*.xls),*.xls')
      //保存工作簿
      oWB.SaveAs(filename)
      //关闭
      oWB.Close()
      //退出
      oXL.Quit()
    },
    _OtherExprot: function (data) { //其他浏览器
      var content = ''
      if (typeof data === 'string') {
        var ele = document.querySelector(data)
        content = template.replace("{htmldata}", ele.outerHTML)
      } else {
        console.log(data)
        var arr = []
        var _this = this
        arr.push('<table>')
        data.forEach(function (value, index) {
          arr.push('<tr>')
          for (key in value) {
            arr.push(`<td>${key=='dataTime'&&index!=0?_this._changeDate(value[key]):value[key]}</td>`)
          }
          arr.push('</tr>')
        });
        arr.push('</table>')
        content = template.replace("{htmldata}", arr.join(''))
      }
      var aEle = document.createElement('a')
      aEle.href = excel_URL + window.btoa(unescape(encodeURIComponent(content)))
      aEle.download = '下载.xls'
      aEle.click()
    },
    _changeDate: function (time) {
      var date = new Date(time)
      var year = date.getFullYear()
      var month = date.getMonth() + 1
      var day = date.getDate()
      return year + '-' + month + '-' + day
    }
  }
  window.Exprot = Exprot
})()