import Player from './player';

export default {
  init(socket, element) {
    if (!element) { return; }
    let playerId = element.getAttribute('data-player-id');
    let videoId  = element.getAttribute('data-id');

    socket.connect();

    Player.init(element.id, playerId, () => {
      this.onReady(videoId, socket);
    })
  },

  onReady(videoId, socket) {
    let msgContainer = document.getElementById('msg-container');
    let msgInput     = document.getElementById('msg-input');
    let postButton   = document.getElementById('msg-submit');
    let vidChannel   = socket.channel(`videos:${videoId}`);

    postButton.addEventListener('click', (_event) => {
      let payload = {body: msgInput.value, at: Player.getCurrentTime()}
      vidChannel.push('new_annotation', payload)
                .receive('error', (err) => console.error(err));
      msgInput.value = '';
    });

    vidChannel.on('new_annotation', (resp) => {
      this.renderAnnotation(msgContainer, resp);
    });

    vidChannel.join()
              .receive('ok', resp => console.log('joined the video channel', resp))
              .receive('error', reason => console.log('join failed', reason));
  },

  escape(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  },

  renderAnnotation(msgContainer, {user, body, at}) {
    let template = document.createElement('div');

    template.innerHTML = `
      <a href="#" data-seek="${this.escape(at)}">
        <b>${this.escape(user.username)}</b>: ${this.escape(body)}
      </a>
    `;

    msgContainer.appendChild(template);
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }
};
