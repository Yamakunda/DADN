import axios from 'axios';

const PORT = 3000;
const HOST = '192.168.171.178';

export const apiFacade = {
    async login(username: string, password: string) {
        const res = await axios.post(`http://${HOST}:${PORT}/account/login`, {
          username,
          password,
        });
        return res.data;
      },
      async getRecord() {
        const res = await axios.get(`http://${HOST}:${PORT}/record`);
        return res.data;
      },
  async switchLight(value: number) {
    return await axios.post(`http://${HOST}:${PORT}/record/store`, {
      light: value
    });
  },
  async switchFan(value: number) {
    return await axios.post(`http://${HOST}:${PORT}/record/store`, {
      fan: value
    });
  },
  async getChartData() {
    const res = await axios.get(`http://${HOST}:${PORT}/chart`);
    const labels = res.data.map((item: any) => {
      const { month, day } = item._id;
      return `${month}/${day}`;
    });
    const humidata = res.data.map((item: any) => Number(item.averageHumidity));
    const tempdata = res.data.map((item: any) => Number(item.averageTemp));
    return { labels, humidata, tempdata };
  },
  
};