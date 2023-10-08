"use client";
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import { useEffect, useState } from 'react';
import Script from 'next/script';


import Image from 'next/image'
import styles from '../styles/slider.module.scss'
import Link from 'next/link';

export default function Player() {

  const [playerData, setPlayerData] = useState<any>([]);
  const [checkOutBox, setCheckOutBox] = useState<any>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseJson: any = await Promise.all([
          fetch('https://stream.radiojar.com/'),
        ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));
        // ]).then((responses) => Promise.all(responses.map((response) => response.json()))).catch((err) => console.log(err));

        console.log(responseJson[0], 'player');

        // setPlayerData(responseJson[0]);
      }
      catch (err) {
        console.log(err);
      }
    }
    // fetchData();
  }, []);

  useEffect(() => {
    // let checkOutBox = playerData?.data?.find((el: any) => el)?.attributes?.checkOutBox.map((el: any) => el);
    // setCheckOutBox(checkOutBox);
    // console.log(checkOutBox);
  }, [playerData]);


  // const playerDataBox = checkOutBox?.map((el: any) => {
  //   return (
  //     <>
  //       <Link key={el?.id} target='_blank' href={el ? el?.attributes?.link : ""}>
  //         <span>{el.title}</span>
  //       </Link>
  //     </>
  //   )
  // });




  return (
    <main className={undefined}>
      <div id="stickPlayer" className="players-holder container">
        <div className="logo-play-holder">
          <div className="sun-logo-div">
          </div>
          <div className="jp-buttons-wrapper">
            <a href="javascript:;" className="jp-play" title="Play"><i className="icon-play"></i></a>
            <a href="javascript:;" style={{ display: 'none' }} className="jp-pause" title="Pause"><i className="icon-pause"></i></a>
          </div>
        </div>
        <div id="rj-player">
          {/* <div id="rj-cover">
                <img src="" />
              </div> */}
          <div className="rj-info">
            <div className="rjp-trackinfo-container">
              <h4 className="rjp-label">Now playing:</h4>
              <p id="trackInfo" className="rjp-info">Artist - Song name</p>
            </div>
            <div className="rjp-player-container">
              <div id="rjp-radiojar-player"></div>
              <div id="rj-player-controls" className="rj-player-controls">
                <div className="jp-gui jp-interface">
                  <div className="jp-controls">
                    <a href="javascript:;" style={{ display: 'block' }} className="jp-mute" title="Mute"><i
                      className="icon-volume-up"></i></a>
                    <a href="javascript:;" style={{ display: 'none' }} className="jp-unmute" title="Unmute"><i
                      className="icon-volume-off"></i></a>
                    <div className="jp-volume-bar-wrapper">
                      <div className="jp-volume-bar">
                        <div className="jp-volume-bar-value"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <script type="text/javascript" src="//www.radiojar.com/wrappers/api-plugins/v1/radiojar-min.js"></script>
      <script>
        rjq('#rjp-radiojar-player').radiojar('player', {
          "streamName": "4qawu2xta2zuv",
        "enableUpdates": true,
        "defaultImage": "//www.radiojar.com/img/sample_images/Radio_Stations_Avatar_BLUE.png",
        "autoplay": false
    });
        rjq('#rjp-radiojar-player').off('rj-track-load-event');
        rjq('#rjp-radiojar-player').on('rj-track-load-event', function (event, data) {
          updateInfo(data);
        if (data.title != "" || data.artist != "") {
          rjq('.rjp-trackinfo-container').show();
        rjq('#trackInfo').html(data.artist + ' - "' + data.title + '"')
      } else {
          rjq('.rjp-trackinfo-container').hide();
      }
    });
        function updateInfo(data) {
      if (data.thumb) {
          rjq('#rj-cover').html('<a href="#"><img src="' + data.thumb + '" alt="" title="" /></a>')
        } else {
          rjq('#rj-cover').html('')
        }
    }
      </script> */}
    </main>

  )
}
