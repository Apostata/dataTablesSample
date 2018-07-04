$(function(){

    $.fn.serializeObject = function() {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function() {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
    var drawB = 1;
	var dados = {
        store: 3253841,
        categ_id: 3614066,
        paging:{
            limit: 20,
            offset:0
        }
    };
 
    var serializeForm = function(data){
        //data.store = dados.store; 
        drawB = data.draw;
        if(data.start > 0){
            data.page = data.start / data.length;
            data.size = data.length;
        }
        console.log(data);
        return data;
    }
  
 
  
    //serializeForm(data);

      
	$(document).ready(function() {
       
     
       var dataTable = $('#example').DataTable( {
            dom: 'Bfrtip',
            bprocessing : true,
            bserverSide : true,
            
            iDisplayStart: 0,
            iDisplayLength: 50,
            bPaginate: true,
            ajax: {
                url: "https://api.mercadoshops.com/v1/shops/"+dados.store+"/listings/search",
                data:serializeForm,
                //dataSrc: 'results'
                dataFilter: function(data){
                    if(!data) {
                        //console.log("sem data");
                        var ejson = {
                            draw : drawB,
                            recordsTotal : 0,
                            recordsFiltered : 0,
                            data : []
                        };
                        return JSON.stringify( ejson );
                    }
                    else {
                        var jsonData = jQuery.parseJSON(data);
                    
                        var json = {
                            draw : drawB,
                            recordsTotal : jsonData.paging.total,
                            recordsFiltered :  jsonData.paging.total,
                            data : jsonData.results || []
                        };
                        console.log(json);
                        return JSON.stringify( json ); // return JSON string
                    }
                }
            },
            columns: [
                { data: "id" },
                { data: "title" },
                { data: "category_name" },
                { data: "stock" },
                { data: "price", render: $.fn.dataTable.render.number( '.', ',', 2, 'R$ ' ) }
            ],
            language:{
                sEmptyTable: "Nenhum registro encontrado",
                sInfo: "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                sInfoEmpty: "Mostrando 0 até 0 de 0 registros",
                sInfoFiltered: "(Filtrados de _MAX_ registros)",
                sInfoPostFix: "",
                sInfoThousands: ".",
                sLengthMenu: "_MENU_ resultados por página",
                sLoadingRecords: "Carregando...",
                sProcessing: "Processando...",
                sZeroRecords: "Nenhum registro encontrado",
                sSearch: "Pesquisar",
                oPaginate: {
                    sNext: "Próximo",
                    sPrevious: "Anterior",
                    sFirst: "Primeiro",
                    sLast: "Último"
                },
                oAria: {
                    sSortAscending: ": Ordenar colunas de forma ascendente",
                    sSortDescending: ": Ordenar colunas de forma descendente"
                }
            },
            select: true,
            buttons: [
                'excel',
                'csv',
                'pdf',
                {
                    extend:'print',
                    text: 'Imprimir',
                }
            ],
            
        } );
    } );
   
});