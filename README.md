# youbike-helper

![](https://kanido386.github.io/2022/06/youbike-helper/1.png)

- Crawler 每分鐘固定抓 YouBike 的資料，切分成一個一個站點資訊以後，丟進 message queue (**RabbitMQ**) 裡。
- Worker 得知 queue 裡有新東西時，就將它們拿出來一一處理，並存進一個 NoSQL database (**MongoDB**) 裡。
- Client 端能透過呼叫 **Express** Server 的 API，抓取「離使用者最近的三個站點還剩下多少台 YouBike」的資訊。
- 整個流程在本地端測試完以後，先練習用 **Docker** 去建置整個環境。
- OK 以後，再練習用 **Kubernetes**，或者更精確來說是 k3s + k3d，來建整個環境。

詳見「[用 Docker 和 Kubernetes 部署一個使用到 RabbitMQ 及 MongoDB 的 Express App](https://kanido386.github.io/2022/06/youbike-helper/)」