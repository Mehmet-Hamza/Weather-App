# 🦁 Weather Find (Lion Weather App)

**Weather Find**, kullanıcıların dünya genelindeki şehirlerin anlık ve haftalık hava durumlarını, yerel saat farklarını ve detaylı meteorolojik verilerini modern bir arayüz üzerinden takip etmelerini sağlayan web uygulamasıdır.

---

### 📌 Projenin Amacı ve Öne Çıkanlar

Bu proje; birden fazla dış API'yi entegre ederek karmaşık hava verilerini kullanıcıya en yalın, hızlı ve görsel (3D Fluent tasarımlar) şekilde sunmak amacıyla geliştirilmiştir. 

* **Gerçek Zamanlı Konum & Zaman Dilimi Hizalaması:** API'den çekilen koordinat verileri sayesinde aratılan her şehrin kendi yerel saatine göre gün doğumu/batımı hesaplanır.
* **Akıllı Gündüz / Gece Görselleştirmesi:** Konumun anlık güneş pozisyonuna (`is_day`) göre dinamik olarak değişen Microsoft Fluent 3D görsel göstergesi.
* **Mobil Odaklı UX/UI:** `scroll-snap` ve esnek grid/flex mimarisi sayesinde mobilde uygulama hissi veren pürüzsüz yatay kaydırma deneyimi.
* **Türkçe Karakter & Şehir İsmi Toleransı:** Gelişmiş string normalizasyonu sayesinde Türkçe karakterli şehir aramalarını sorunsuz işleme ve son 5 aramayı hafızada tutma.

---

### 📊 Sunulan Veriler ve Analizler

* **Anlık Değerler:** Sıcaklık (°C), Hissedilen Sıcaklık, Rüzgar Hızı (km/h) ve Nem Oranı (%).
* **Görsel Durum:** Anlık hava durumu (Güneşli, Yağmurlu, Sisli vb.) ve ilgili dinamik ikonlar.
* **Detaylı Analiz:** Gün Doğumu, Gün Batımı ve Renk Kodlu Hava Kalitesi Göstergesi (İyi / Orta / Kötü).
* **7 Günlük Tahmin:** Gelecek 7 günün maksimum/minimum sıcaklıkları ve hava durum seyri.

---

### 🛠️ Teknik Mimari ve Teknolojiler

* **Arayüz:** React.js (Functional Components, Custom Hooks & Dynamic State Management)
* **Stilleme:** Pure CSS3 (Custom Flex/Grid, Keyframe Animations, Mobile First Responsive Breakpoints)
* **Veri Kaynakları (API Entegrasyonu):**
  * **Open-Meteo API:** Detaylı günlük/saatlik tahminler, `timezone=auto` zaman dilimi tespiti ve Geocoding arama servisi.
  * **wttr.in API:** Anlık nem ve rüzgar hızı verilerini doğrulayan ikincil kaynak.
* **Visual Assets:** Microsoft Fluent 3D Emoji CDN
