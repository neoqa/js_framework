import chakram from 'chakram';

export default class BasePage {
  constructor(url) {
    this.url = url;
    this.chakram = chakram;
    this.expect = chakram.expect;
  }

  getUrl() {
    return this.url;
  }

  getChakram() {
    return this.chakram;
  }

  // Returns api wait
  chakramWait() {
    return this.chakram.wait();
  }

  // Returns simple GET request
  getRequest(reqUri){
    return this.chakram.get(reqUri);
  }

  // Returns simple POST request
  postRequest(reqType, reqUri) {
    switch(reqType) {
      case 'post': return this.chakram.post(reqUri);
      case 'put': return this.chakram.put(reqUri);
      case 'delete': return this.chakram.delete(reqUri);
      case 'patch': return this.chakram.patch(reqUri);
    }
  }
}
