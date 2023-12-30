function SuccessNotice(NoticeContent, func) {
  //成功提示
  var dialog = art.dialog.through({
    content: NoticeContent,
    fixed: true,
    id: "SuccessNotice",
    icon: "succeed",
    lock: true,
    okVal: "确定",
    ok: function () {
      func();
    },
  });
}

function FailNotice(NoticeContent, func) {
  //失败提示
  var dialog = art.dialog.through({
    content: NoticeContent,
    fixed: true,
    id: "FailNotice",
    icon: "error",
    lock: true,
    okVal: "确定",
    ok: function () {
      func();
    },
  });
}

function openpage(opentitle, openurl, closefunc) {
  //打开一个页面
  art.dialog.open(openurl, {
    title: opentitle,
    lock: true,
    fixed: true,
    resize: false,
    close: function () {
      closefunc();
    },
  });
  return false;
}
function CheckAll() {
  if ($("#chkAll").attr("checked")) {
    $('input[name="id"]').attr("checked", true);
  } else {
    $('input[name="id"]').attr("checked", false);
  }
}

/**
 * ContainID: 上传图片的input id
 * UpType: 'one' | 'more'
 */
function UpPage(opentitle, ContainID, UpType) {
  //打开上传页面

  art.dialog.open("iframe/UpPage.php?UpType=" + UpType, {
    title: opentitle,
    lock: true,
    fixed: true,
    resize: false,
    ok: function (contentWindow, top) {
      const dialog = contentWindow.__dialog;
			
      // 点击上传组件的onOk
      if (dialog && !dialog._isOnOkClick) {
				if (!dialog.onok()) return false;
      }
			
			const imageListData = art.dialog.data("@JSONZ:uploadedImageList");
      if (imageListData) {
        art.dialog.removeData("@JSONZ:uploadedImageList");
        // 写入图片
				const $dom = $('#' + ContainID);
				if ($dom.length) {
					const isMultiple = UpType === 'more';
					const imageSrc = 	imageListData.map(item => item.src)
					const imageValue = isMultiple ? imageSrc[0] : imageSrc.join(',');

					if (isMultiple) {
						const previousValue = $dom.val();
						const finallyValue = previousValue ? previousValue + ',' + imageValue : imageValue;
						$dom.val(finallyValue)
					} else {
						$dom.val(imageValue);
					}
				}
      }
    },
    
  });
  return false;
}
