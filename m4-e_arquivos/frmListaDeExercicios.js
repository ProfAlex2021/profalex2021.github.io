$(document).ready(function () {
    ObterListaDeExercicios();
});

function ObterListaDeExercicios() {
  
    var idConteudo = location.search.toString();

    idConteudo = idConteudo.replace(/(\?=)([0-9]+)/gi, "$2");

    $("#div_ListaExercicio").html("");
    $("#div_ListaExercicioDesabilitado").html("");
    $("#ddlExercicio").html("");

    var contador = 1;
    var contadorExercicio = 1;

    if ($("#ddlConteudo").val() != 0) {
        var callback = (function (json) {
            var strHtml = "";
            $(json.d).each(function(i, v) {

                strHtml += '<div class="questao" style="display: inline-block; padding:10px; " id="espaco-questoes">';
                strHtml += '<div class="num"><a name="Q_Ordem">' + contadorExercicio + '</a></div>';
                strHtml += '<div class="titulo"><label id="lblConteudo">' + v.Enunciado + '</label></div>';
                strHtml += '<div class="Alternativas">';
                strHtml += '    <ul>';

                $(json.d[i].LstAlternativa).each(function (idx, valor) {

                    strHtml += '        <li>';
                    strHtml += '            <label for="alt_1" style="padding: 1px;">';
                    strHtml += '                <label id="lblletra">' + valor.LetraAlternativa + ')</label>';
                    strHtml += '                <label id="lblConteudoAlternativa">' + valor.Texto + '</label>';
                    strHtml += '            </label>';
                    strHtml += '        </li>';

                });

                strHtml += '    </ul>';
                strHtml += '</div>';
                
                strHtml += '<input type="button" value="Ver alternativa correta" class="botao-ver-correta" rel="' + v.Id + '" />';
                strHtml += '   <div id="div_correta_' + v.Id  + '" class="div-alternativa-correta">';

                $(json.d[i].LstAlternativa).each(function(idx, valor) {
                    if (valor.FlagAlternativaCorreta) {
                        strHtml += '<b>Alternativa correta: <label id="lblletraCorreta">' + valor.LetraAlternativa + '</label></b>';
                    }
                });
                
                strHtml += '   </div>';
                strHtml += '   <br />';
                strHtml += '   <div style="width: 100%;float: left;padding: 6px;"><span style="font-size: 9px;"></span></div>';
                strHtml += '</div>';
                contadorExercicio++
            });

            $("#frmProva").html(strHtml);
        });
    }

    WebService("ws/wsExercicio.asmx/BuscaExercicioComAlternativas", callback, "{idConteudo:" + idConteudo + "}");
}

/*function cadastroDisciplinaParaProva() {
    alert("aaeeee");
}*/