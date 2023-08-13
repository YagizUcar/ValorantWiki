import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Maps = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://valorant-api.com/v1/maps?language=tr-TR')
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API veri çekme hatası:', error);
        setLoading(false);
      });
  }, []);

  // Slider ayarları
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <div className="container mt-4">
      {/* Arka plan video bölümü */}
      <div className="background-video-wrapper">
        <video className="background-video" autoPlay loop muted>
          <source src="https://rr2---sn-4g5e6ns7.googlevideo.com/videoplayback?expire=1691966299&ei=-wbZZLzGCYq46dsPj-OsgAI&ip=86.33.69.23&id=o-ADd3QJP3y7GTM-n9SwdDjzENgQcKOjGSjO3TmBbi5v2B&itag=137&source=youtube&requiressl=yes&spc=UWF9f4cmsv32Fqt8SFxqWcBJFkK3qWE&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=30475324&dur=150.291&lmt=1673037472304921&keepalive=yes&fexp=24007246,24350018&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhANwjwc5NEzaZdgfKt2qgrzEgAoBhFiZNzsgbS0JcFW_eAiAqpxPn3I4ZLNa8pJA-4ljpwSSsHQrEs0xQp5Fd15KWeQ%3D%3D&rm=sn-uxaxh5ji-15be7l&req_id=bd4736ee99c3a3ee&ipbypass=yes&redirect_counter=2&cm2rm=sn-c0qs77e&cms_redirect=yes&cmsv=e&mh=2I&mip=95.70.243.203&mm=34&mn=sn-4g5e6ns7&ms=ltu&mt=1691944372&mv=m&mvi=2&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRQIgf4HqBH-HwCEalYQy_Q7OrxBvuC8RB1l3aeNTj7s8EW8CIQCp6rqvTVFLZAl9mDSvAlqOOQNYRMkQHY11Yqq7GGCyVQ%3D%3D" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h1 className="text-center">Haritalar</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <Slider {...sliderSettings}>
          {data.map(item => (
            <div key={item.uuid} className="col-md-12 mb-12">
              <div className="card1">
                <img src={item.splash} className="card-img-top" alt={item.displayName} />
                <div className="card-body">
                  <h5 className="card-title centertext">{item.displayName}</h5>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default Maps;
