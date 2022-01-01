export class Basket {
  static IP_ADDRESS = ''

  static setIPAddress(ip) {
    Basket.IP_ADDRESS = ip
  }

  static getIPAddress() {
    return Basket.IP_ADDRESS
  }
}
