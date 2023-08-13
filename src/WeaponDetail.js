import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const WeaponDetail = () => {
  const [weaponData, setWeaponData] = useState({});
  const [loading, setLoading] = useState(true);
  const { weaponUuid } = useParams();

  useEffect(() => {
    axios.get(`https://valorant-api.com/v1/weapons/${weaponUuid}?language=tr-TR`)
      .then(response => {
        setWeaponData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API veri çekme hatası:', error);
        setLoading(false);
      });
  }, [weaponUuid]);

  return (
    <div className="weapon-detail-container">
      {/* Arka plan video bölümü */}
      <div className="background-video-wrapper">
        <video className="background-video" autoPlay loop muted>
          <source src="https://rr1---sn-4g5e6nsr.googlevideo.com/videoplayback?expire=1691966066&ei=EgbZZMy3HJaLsfIPzuKN8AY&ip=191.96.255.138&id=o-ADSAUAnkTxQuhB8Oie6HgfbsFMHSoho__31YADKmmyeb&itag=137&source=youtube&requiressl=yes&spc=UWF9f3uwULrZHX6m0GUSy9a5A6i1zTU&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=58506819&dur=380.124&lmt=1687674325534166&keepalive=yes&fexp=24007246,24350017,51000023&beids=24350017&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAPizi7ufnIU6bW1olFM3nUXidbPCw2fPu-upm4rUI8vMAiBbISwUSmHnjWFPXhs-_x3DlQ7r5orPwY-QIg0iIW2eSA%3D%3D&redirect_counter=1&cm2rm=sn-a5me7z7e&req_id=58a07beea581a3ee&cms_redirect=yes&cmsv=e&mh=kS&mip=95.70.243.203&mm=34&mn=sn-4g5e6nsr&ms=ltu&mt=1691943083&mv=u&mvi=1&pl=24&lsparams=mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAOERIV0eXuBMw7kUIPRAwGA1YFt50iseacgjNEN45aagAiEAipfmGcoJO80dDzd7mbSyP-v5rX1aHNc1orL94FyMqZg%3D" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mt-4">
        <h1 className="text-center">Silah Detayları</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="row justify-content-center align-items-center">
            <div className="col-md-6 mb-6">
              <div className="card weapon-bg">
                <img src={weaponData.displayIcon} className="card-img-top" alt={weaponData.displayName} />
                <div className="card-body">
                  <h1 className="card-title white centertext">{weaponData.displayName}</h1>
                  <h2 className="card-title white centertext">Atis Hizi: {weaponData.weaponStats.fireRate}</h2>
                  <h2 className="card-title white centertext">Sarjor Kapasitesi: {weaponData.weaponStats.magazineSize}</h2>
                  <h2 className="card-title white centertext">İsabet Orani: {weaponData.weaponStats.firstBulletAccuracy}</h2>
                  <h2 className="card-title white centertext">Sarjor Değistirme Hizi: {weaponData.weaponStats.reloadTimeSeconds}sn</h2>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeaponDetail;
