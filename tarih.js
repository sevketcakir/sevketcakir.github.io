var Tatil = {};
Tatil[new Date('01/01/2016')] = 'Yılbaşı';
Tatil[new Date('04/23/2017')] = 'Ulusal Egemenlik ve Çocuk Bayramı';
Tatil[new Date('05/01/2017')] = 'Emek ve Dayanışma Günü';
Tatil[new Date('05/19/2017')] = 'Atatürk\'ü Anma Gençlik ve Spor Bayramı';
Tatil[new Date('06/25/2017')] = 'Ramazan Bayramı';
Tatil[new Date('06/26/2017')] = 'Ramazan Bayramı';
Tatil[new Date('06/27/2017')] = 'Ramazan Bayramı';
Tatil[new Date('08/30/2017')] = 'Zafer Bayramı';
Tatil[new Date('09/01/2017')] = 'Kurban Bayramı';
Tatil[new Date('09/02/2017')] = 'Kurban Bayramı';
Tatil[new Date('09/03/2017')] = 'Kurban Bayramı';
Tatil[new Date('09/04/2017')] = 'Kurban Bayramı';
Tatil[new Date('10.29.2017')] = 'Cumhuriyet Bayramı';
var StajGunleri={};
function tatilGuncelle(){
	var tatiller=document.getElementById("tatiller");
	for (var key in Tatil) {
		//console.log("key " + key + " has value " + myArray[key]);
    var tarih=new Date(key);
    tarih=tarih.getFullYear()+"."+tarih.getMonth()+"."+tarih.getDate();
    var option = document.createElement("option");
		option.value = key;
		option.text = tarih+" "+Tatil[key];
		tatiller.appendChild(option);
	}
}

function hesapla()
{
    var gun=document.getElementById("gunsay").value;
    var guninit=gun;
    var bastar=new Date(document.getElementById("bastar").value);
    var btcopy=new Date(document.getElementById("bastar").value);//kopyası
    var cumartesi=document.getElementById("cumartesi").checked;

    StajGunleri={};
    var deneme=0;
    var keys=Object.keys(Tatil);
    while(gun>0)
    {
      var mumkun=true;
      if(bastar.getDay()==0 || !cumartesi && bastar.getDay()==6)
        mumkun=false;
      if(keys.includes(bastar.toString()))
        mumkun=false;

      if($('#but').is(':checked'))
      {
        var bast=new Date($("#butbas").val())
        var bitt=new Date($("#butbit").val())
        if(bastar>=bast && bastar<=bitt)
          mumkun=false;
      }
      if($('#yazokulu').is(':checked'))
      {
        var bast=new Date($("#yobas").val());
        var bitt=new Date($("#yobit").val());
        if(bastar>=bast && bastar<=bitt)
          mumkun=false;
      }
      var donbit=new Date($("#donembit").val());
      var donbas=new Date($("#donembas").val());
      if(bastar<=donbit || bastar>=donbas)
        mumkun=false;
      if(mumkun)
      {
        StajGunleri[bastar]="Staj günü "+(guninit-gun+1);
        gun--;
      }
      bastar.setDate(bastar.getDate()+1);
      deneme++;
      if(deneme>365)
      {
        alert('uygun aralık bulunamadı!');
        break;
      }
    }
    bastar.setDate(bastar.getDate()-1);
    $("#bittar").html("Bitiş Tarihi: "+bastar.getFullYear()+"."+(bastar.getMonth()+1)+"."+bastar.getDate())
    datePickerEkle($( "#StajGunleri" ),StajGunleri);
    $('#StajGunleri').datepicker("setDate", btcopy );
}

function datePickerEkle(eleman,tatil,stajgunu)
{
  eleman.datepicker('destroy');
  eleman.datepicker({
  	//dateFormat: 'dd.mm.yy',
  	beforeShowDay: function(date) {
  	var Highlight = tatil[date];
  	if (Highlight) {
  		return [false, 'ui-state-highlight', Highlight];
  	}
  	else {
  		if(date.getDay()==0) return [false,'','Pazar'];
  		return [true, '', ''];
  	}

  },
  	//dateFormat: "dd.mm.yy",//tarih formatı yy=yıl mm=ay dd=gün
  	firstDay:1,
  	appendText: "(yıl-ay-gün)",//inputun sonuna bu yazıyı yazar.
  	/*autoSize: true,//inputu otomatik boyutlandırır*/
  	changeMonth: true,//ayı elle seçmeyi aktif eder
  	/*changeYear: true,//yılı elee seçime izin verir*/
  	dayNames:[ "Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi" ],//günlerin adı
  	dayNamesMin: [ "Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt" ],//kısaltmalar
  	defaultDate: +5,//takvim açılınca seçili olanı bu günden 10 gün sonra olsun dedik
  	/*isRTL: true//takvimi ters çevirir garip bi özellik :D*/
  	maxDate: "+1y",//ileri göre bilme zamanını 2 yıl 1 ay 2 hafta yaptık
  	minDate: "-1y",//geriyi göre bilme alanını 1 yıl 1 ay 2 hafta yaptık.bunu istediğiniz gibi ayarlaya bilirsiniz
  	monthNamesShort: [ "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık" ],//ay seçim alanın düzenledik
  	nextText: "ileri&gt;",//ileri butonun türkçeleştirdik
  	prevText: "&lt;geri",//buda geri butonu için
  	/*showAnim: "bounce",//takvim açılım animasyonu alta tüm animasyon isimleri yazdım */
  	/*fold-blind-bounce-clip-drop-explode-fade-highlight-puff-pulsate-scale-shake-slide-size-transfer*/
  	showOn: "both",//inputun yanına ... butonu koyuyor
  });
}
