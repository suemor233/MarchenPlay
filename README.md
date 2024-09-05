# MarchenPlay

## 简介

MarchenPlay 是本地视频弹幕播放器，使用 [弹弹play API](https://github.com/kaedei/dandanplay-libraryindex/blob/master/api/API.md)，拖入动漫视频即可匹配对应的弹幕。

采用 Electron 开发，支持 **Web, macOS, Windows, Linux** 四个版本，其中主要适配 **macOS** 版本，目前仅支持 **mp4, mkv** 格式。

目前还在开发初期，功能很少，第一次接触 Electron，还在不断踩坑中，暂时先只提供 [Web版本](https://marchen-play.suemor.com) 体验。

## 开发

```bash
$ git clone https://github.com/suemor233/MarchenPlay.git

$ pnpm install

$ pnpm dev
```

## 截图

![home](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/marchen-play-1.png)

![player](https://fastly.jsdelivr.net/gh/suemor233/static@main/img/marchen-play-player.png)

## License

[MIT](http://opensource.org/licenses/MIT)