import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { convertToEnglishChars } from './TurkishToEnglish';
import '../../my-app/src/styles/hoover.css';

const Agent = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { agentUuid } = useParams();

  useEffect(() => {
    axios
      .get(`https://valorant-api.com/v1/agents/${agentUuid}?language=tr-TR`)
      .then(response => {
        setData(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('API veri çekme hatası:', error);
        setLoading(false);
      });
  }, [agentUuid]);

  const renderTooltip = (text, tooltipId) => (
    <Tooltip id={tooltipId} placement="top">
      {convertToEnglishChars(text)}
    </Tooltip>
  );

  return (
    <div className="agent-details-container">
      <video className="background-video" autoPlay loop muted>
        <source src="https://rr1---sn-4g5edndl.googlevideo.com/videoplayback?expire=1691966251&ei=ywbZZNOyJpudg8UPyOmesAU&ip=36.78.11.153&id=o-AL-u8g46WcsjqTXFIgEOhAe2WF3srs4I6ewGKCdiAOG_&itag=137&source=youtube&requiressl=yes&spc=UWF9f9hA_TO-g72mjAo4l4CzPtkbSHg&vprv=1&svpuc=1&mime=video%2Fmp4&gir=yes&clen=66975824&dur=231.333&lmt=1653053580498166&keepalive=yes&fexp=24007246,24350017,51000011,51000024&beids=24350017&c=ANDROID&txp=4535434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cspc%2Cvprv%2Csvpuc%2Cmime%2Cgir%2Cclen%2Cdur%2Clmt&sig=AOq0QJ8wRAIgcCRLH3i1lcgudJQRFfytxnFoJjqkEbASqu4bUwItfFICIG-9ThOk0kqa9N6RdwGJbQPWipamXTuD2H0PUrVnTmOG&rm=sn-2uuxa3vh-jb3s7l,sn-2uuxa3vh-jb3ez7d&req_id=3f35f58cf79aa3ee&cmsv=e&ipbypass=yes&redirect_counter=3&cm2rm=sn-npode76&cms_redirect=yes&mh=Cp&mip=95.70.243.203&mm=34&mn=sn-4g5edndl&ms=ltu&mt=1691944372&mv=m&mvi=1&pl=24&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pl&lsig=AG3C_xAwRAIgbr_Mb2r6kXCwSchdOflG7SCC9--q2D_6AVtX06hNX5YCIGiFid7mmqQ1JG-UyUhfI9ykpmg8zcVWWl9I3HKvbPUH" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="container mt-4">
        <h1 className="text-center">Ajan Detayları</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="row justify-content-center align-items-center">
            <div className="col-md-5 mb-5">
              <div className="card custom-bg">
                <img
                  src={data.bustPortrait}
                  className="card-img-top"
                  alt={data.displayName}
                />
                <div className="card-body">
                  <h1 className="card-title white centertext">
                    {data.displayName}
                  </h1>
                  <h6 className="card-details white mb-4">
                    {convertToEnglishChars(data.description)}
                  </h6>
                  <h6 className="card-details white text-center">
                    <div className="icon-container">
                      <img
                        src={data.role.displayIcon}
                        alt={data.role.displayName}
                        className="role-icon"
                      />
                    </div>
                    {convertToEnglishChars(data.role.displayName)}
                  </h6>

                  <div className="card-skills row">
                    {data.abilities.map((item, index) => (
                      <div key={index} className="col-md-3 mb-3">
                        <OverlayTrigger
                          placement="top"
                          overlay={renderTooltip(
                            item.description,
                            `tooltip-${index}`
                          )}
                        >
                          <div className="ability-card custom-tooltip">
                            <img
                              className="ability-icon"
                              src={item.displayIcon}
                              alt={item.displayName}
                            />
                            <div className="ability-name white">
                              {convertToEnglishChars(item.displayName)}
                            </div>
                          </div>
                        </OverlayTrigger>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Agent;
