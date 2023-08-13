import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../src/styles/hoover.css';
import { convertToEnglishChars } from './TurkishToEnglish';

const AgentList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const buttonClickSound = new Audio('/sound/ses.mp3'); // Ses dosyasının yolunu düzenleyin

  const handleButtonClick = () => {
    buttonClickSound.currentTime = 0; // Ses dosyasını başa sar
    buttonClickSound.play(); // Ses dosyasını çal

    // 5 saniye sonra sesi durdur
    setTimeout(() => {
      buttonClickSound.pause(); // Ses dosyasını durdur
    }, 5000);
  };

  useEffect(() => {
    axios.get('https://valorant-api.com/v1/agents?language=tr-TR&isPlayableCharacter=true')
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
    <div className="agent-list-container">
      <div className="background-video-wrapper">
        <video className="background-video" autoPlay loop muted>
          <source src="https://rr1---sn-u0g3oxu-pnus.googlevideo.com/videoplayback?expire=1691949465&ei=OcXYZNvnBs2E8wSswaXYBg&ip=181.214.94.85&id=o-ACrUIJJkI21ZzQwTIDcEB2xf1izX5zrcvoXOBvG0Ye0S&itag=137&source=youtube&requiressl=yes&spc=UWF9f_8QO31dQifk-p7vshPKLgm_ieY&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=51676563&dur=245.333&lmt=1672952022506679&keepalive=yes&fexp=24007246,24350018,24362685,24363393&beids=24350018&c=ANDROID&txp=5532434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAJ8qTxNJC23eMGurlQnEBrLiBdfaTeV2XCikCBtssN69AiEAmItotvDqSLhqVN619-9qlLjdHpiLR6WkvSCtvAmKFIo%3D&redirect_counter=1&rm=sn-p5qe7z7e&req_id=f41bfd9106e3a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&mh=oz&mip=95.70.243.203&mm=31&mn=sn-u0g3oxu-pnus&ms=au&mt=1691943640&mv=u&mvi=1&pcm2cms=yes&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIhAOW3GrnL0QAzkSTeBNDmtxUQHbq7sC0FMLvLWidQAGmSAiAivfb7Ql1_kFspr_7nroy_aseI7Be8FKbaikLGL4VCxQ%3D%3D" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="container mt-4">
        <h1 className="text-center">Ajan Listesi</h1>
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
                <div className="card card-small">
                  <div className="card-background"></div>
                  <img src={item.displayIcon} className="card-img-top" alt={convertToEnglishChars(item.displayName)} />
                  <div className="card-body">
                    <Link to={`/agent/${item.uuid}`}>
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
    </div>
  );
};

export default AgentList;
