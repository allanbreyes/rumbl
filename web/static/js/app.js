import 'phoenix_html';
// import socket from './socket';
import Player from './player';

let video = document.getElementById('video')

if (video) {
  Player.init(video.id, video.getAttribute('data-player-id'), () => {
    console.log('YouTube Player loaded');
  });
}
