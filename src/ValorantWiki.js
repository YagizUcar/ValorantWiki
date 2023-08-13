import React from 'react';
import '../src/styles/ValorantWiki.css'; // Özel stil dosyasını ekledik

const ValorantWiki = () => {
  return (
    <div className="container mt-4 custom-valorant-wiki">
      <h1 className="text-center">Valorant WİKİ</h1>
      <p className="text-center">Bu Valorant Wiki sayfasına hoş geldiniz! Alfatek Yazılım Şirketi için geliştirdiğim projenin istenilenlerini ve detaylarını burada paylaşacağım.</p>
      <p>
    Öncelikle bizden istenilen 4 ana unsur bulunmaktaydı bunlar;
      </p>
      <li>
      Sayfa üzerindeki verilerin Türkçe olması gerekiyor, her gittiğiniz endpointte ?language=tr-TR paramatresini eklediğinizde Türkçe veriler gelecektir.
      </li>
      <li>
      Responsive tasarım konusunda dikkatli olmalısınız, Mobil olarakta inceleyeceğiz.
      </li>
      <li>
      Yapacağınız proje React veya Vue frameworkleri ile hazırlanması gerekmektedir.
      </li>
      <li>
      Şablon için Bootstrap, Antdesign vs. gibi kütüphaneler kullanılması istenmektedir.
      </li>
<p>Bu 4 temel istek projede istenilen şekilde yerine getirilmiştir.Bunun dışında zorunlu olmayan istek App.js içinde kod halinde yazılmış fakat test edilmemiştir</p>
<p>İstenilen 5 sayfada oluşturulmuş ve istenilen şekilde çalışmaktadır.Tasarım olarak  özellikle dikkat edilmesi gereken ajan detay sayfası için eski oyun kartlarından ilham alarak her karakter için bir kart sayfası oluşturdum
   Sade ama şık bir görünüm kattığımı düşünmekteyim.Bunun dışında hatalarla karşılaştığım durum kartlarda yeteneklerin üstüne tıkladığımda kartı ters çevirip yetenek bilgilerini yazmasını istedim fakat başarılı olamadım ve kartlar beklediğim kadar parlak olmadı.Son olarak ise ajan ses dosyalarını karakter kartlarında çalmak istesem de başarılı olamadım.
</p>
<p>Projenin genel detayları bunlar olup beğeninize sunmaktayım.</p>
<p>İyi Günler ve İyi Çalışmalar Dilerim. </p>
<h2>Yağız Uçar</h2>
  
    </div>
  );
};

export default ValorantWiki;
