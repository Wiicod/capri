/**
 * Created by evaris on 28/02/2016.
 */

app
    .filter('filterByDate',function(){

        return function (datas,tags){
            if(datas==undefined)
                return;
            return datas.filter(function(data){

                return (data.jour >= tags.from)&&(data.jour < tags.to);
            })
        }
    })
    .filter('underscoreless', function () {
        return function (input) {
            return input.replace(/_/g, ' ');
        };
    })
    .filter('filtreTooltip', function () {
        return function (input) {
            if(input=='sl'){
                return "De l'operateur vers un autre operateur du meme pays";
            }else if(input=='si'){
                return " De l'operateur vers un operateur etranger";
            }else if(input=='ei'){
                return "D'un operateur etranger l'operateur";
            }else if(input=='el'){
                return "De l'operateur vers le meme operateur";
            }else{
                return ;
            }
        };
    })
    .filter('filtreTraffic',function($filter){

        return function (datas,tag){
            if(datas==undefined)
                return;
            if(tag='appels'){
               var t= new Date(1970, 0, 1).setSeconds(tags);
               return  $filter('date')(t, "H:mm:ss");

            }
            return datas.filter(function(data){

                return (data.jour >= tags.from)&&(data.jour < tags.to);
            })
        }
    })
    .filter('filtreTitre',function($filter){

        return function (data){
            if(data ==undefined)
                return ;
            if(data=='appels'){
                return  "Durree (en Heure )";
            }else if(data=='sms'){
                return  "Nombre ( /1000 )";

            }else if(data=='Internet_data'){

                return " Consomation ( en Go )";

            }else if(data=='Mobile_banking'){
                return  "Consomation (en FCFA )";

            }else{
                return ;
            }

        }
    })
    .filter('filtreValue',function($filter){

        return function (data,tag){
            if(data ==undefined)
                return 0;
            if(tag=='jour'){
                return  $filter('date')(data[tag], "dd-MM-yyyy");
            }else if(tag=='appels'){
                var t= new Date(1970, 0, 1).setSeconds(data);
                return  $filter('date')(t, "dd:H:mm:ss");

            }else if(tag=='sms'){

                return  (data/1000).toFixed(2);

            }else if(tag=='Internet_data'){
                return ( data/1000000).toFixed(2);

            }else if(tag=='Mobile_banking'){

                return  data;

            }else{
                return data ||0;
            }

        }
    })
    .filter('filtreBilan',function($filter){

        return function (datas,tags){
            if(datas[tags]==undefined)
                return 0;
            if(tags=='jour'){
                  return  $filter('date')(datas[tags], "dd-MM-yyyy");
            }else if(tags=='appels'){
                var t= new Date(1970, 0, 1).setSeconds(datas[tags]);
                return  $filter('date')(t, "H:mm:ss");

            }else{
                return datas[tags]||0;
            }

        }
    })
    .filter('convertUnit',function($filter){
        return function (datas,tags){
            if(datas==undefined)
                return 0;
            if(tags=='s'){
                  return  datas;
            }else if(tags=='min'){
                return (datas/60).toFixed(2);
            }
            else if(tags=='h'){
                return (datas/3600).toFixed(2);
            }else if(tags=='j'){
                return (datas/(3600*24)).toFixed(2);
            } else if(tags=='annee'){
                return (datas/(3600*24*365)).toFixed(2);
            }else{
                return datas||0;
            }

        }
    })
    .filter('selectedTags', function() {
    // filter to check array of elements
    return function(datas, tags) {
        if(datas==undefined)
            return;

       /* if(datas.type==undefined&&datas.porte==undefined)return;

        if(datas.type.length==0&&datas.porte.length==0)*/
           // return;
        return datas.filter(function(data) {
            var k;
            if("type" in tags){
                k=tags.type.indexOf(data.type) != -1;
                if("porte" in tags){
                    k=k&&(tags.porte.indexOf(data.porte)!=-1);
                }
                return k;
            }
            return false;

        });
    };
});