import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../src/styles/hoover.css';
import { convertToEnglishChars } from './TurkishToEnglish';

const WeaponsList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const buttonClickSound = new Audio('/sound/ses2.mp3'); // Ses dosyasının yolunu düzenleyin

  const handleButtonClick = () => {
    buttonClickSound.currentTime = 0; // Ses dosyasını başa sar
    buttonClickSound.play(); // Ses dosyasını çal

    // 1 saniye sonra sesi durdur
    setTimeout(() => {
      buttonClickSound.pause(); // Ses dosyasını durdur
    }, 1000);
  };

  useEffect(() => {
    axios.get('https://valorant-api.com/v1/weapons?language=tr-TR')
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API veri çekme hatası:', error);
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter(item => item.displayName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="container mt-4">
      {/* Arka plan video bölümü */}
      <div className="background-video-wrapper">
        <video className="background-video" autoPlay loop muted>
          <source src="https://rr3---sn-u0g3oxu-pnue.googlevideo.com/videoplayback?expire=1691963857&ei=cf3YZN2QDNaVlu8PnISnuA8&ip=181.214.166.110&id=o-ACUm5FGJiU_ghYfcj1XuOIOVCjlfTiTempPIEIYgzimJ&itag=137&source=youtube&requiressl=yes&spc=UWF9f87zm05eaURphRaspNE9CHnfF9g&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=53171592&dur=199.999&lmt=1689152421507745&keepalive=yes&fexp=24007246,24350018,51000023&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRQIgJwlcs_CiRQFJIQx3xqzgwDYPoXW5UcL4GFkaCZeLqmACIQC88L7__hwABF3h1-aTkS8P4PBt8lR5nE7zPCDYSyTzEw%3D%3D&redirect_counter=1&rm=sn-vgqezd76&req_id=b67e1526f9a2a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=v9&mip=95.70.243.203&mm=31&mn=sn-u0g3oxu-pnue&ms=au&mt=1691944163&mv=m&mvi=3&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRgIhAOl4yDOhdxd8v3VucOkjESB61499F-FNRhepu19ulu8iAiEAqdCOk6McODqqBrmLYMcNn-V66yXM-WSi7X09Kefan5I%3D" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <h1 className="text-center">Silah Listesi</h1>
      <div className="text-center mb-4">
        <input
          type="text"
          placeholder="İsimle Ara"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {filteredData.map(item => (
            <div key={item.uuid} className="col-md-4 mb-4">
              <div className="card">
                <img src={item.displayIcon} className="card-img-top" alt={convertToEnglishChars(item.displayName)} />
                <div className="card-body">
                  <Link to={`/Weapons/${item.uuid}`}>
                    <button className="button" onClick={handleButtonClick}>
                      <span className="button__label">
                        <span className="button__label-text">{convertToEnglishChars(item.displayName)}</span>
                        <span className="button__hover-mask"></span>
                      </span>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeaponsList;
