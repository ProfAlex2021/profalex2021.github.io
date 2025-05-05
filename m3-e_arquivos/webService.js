function WebService(url, callback, pars) {
    if (!pars) {
        pars = "{}";
    }
    $.ajax({
        data: pars,
        url: url,
        type: "POST",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        cache: false,
        success: function (json) {
            callback(json);
        },
        error: function (xml, status) {
            if (status == 'error') {
                try {
                    var json = eval('(' + xml.responseText + ')');
                    if (json.ExceptionType == "webADM.AntiCorrupcao.SessionException") {
                        alert(json.Message, alertType.erro, function () {
                            window.location = 'Default.aspx';
                        });
                    } else {
                        alert(json.Message, alertType.erro);
                    }
                } catch (e) { }
            } else {
                alert(status, alertType.erro);
            }
        },
        beforeSend: function (xml) {
            if (!this.data)
                xml.setRequestHeader("Content-Type", "application/json;utf-8");
        }
    });
}